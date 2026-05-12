import json
import os
import subprocess
import time
import requests

def get_wikimedia_image_url(scientific_name):
    """
    Attempts to get a direct image URL from Wikimedia Commons for a given scientific name.
    """
    search_url = f"https://commons.wikimedia.org/w/api.php"
    headers = {
        "User-Agent": "PlantDownloaderBot/1.0 (contact: user@example.com)"
    }
    params = {
        "action": "query",
        "format": "json",
        "prop": "pageimages",
        "titles": scientific_name,
        "pithumbsize": 800
    }
    
    try:
        response = requests.get(search_url, params=params, headers=headers)
        if response.status_code != 200:
            print(f"HTTP Error {response.status_code} for {scientific_name}")
            return None
        data = response.json()
        pages = data.get("query", {}).get("pages", {})
        for page_id in pages:
            page = pages[page_id]
            if "thumbnail" in page:
                return page["thumbnail"]["source"]
    except Exception as e:
        print(f"Error searching for {scientific_name}: {e}")
    
    # Try searching with "File:Scientific Name.jpg" pattern if direct title fails
    # Or just return None and handle it.
    return None

def main():
    with open('src/data/plants.json', 'r', encoding='utf-8') as f:
        families = json.load(f)

    all_plants = []
    for family in families:
        for plant in family['plants']:
            # Extract scientific name from the string like "Magnólia veľkokvetá (Magnolia grandiflora)"
            name_str = plant.get('name', '')
            import re
            match = re.search(r'\((.*?)\)', name_str)
            scientific_name = match.group(1) if match else plant['systematics'].get('Druh', name_str)
            
            # Clean up scientific name (sometimes it has extra info)
            scientific_name = scientific_name.split('(')[0].strip()
            
            plant['scientific_name_cleaned'] = scientific_name
            all_plants.append(plant)

    print(f"Total plants: {len(all_plants)}")

    # We'll use the image-fetcher skill, but we need the URLs first.
    # I'll create a list of (id, scientific_name, url)
    plant_image_urls = []
    
    # To avoid being blocked and for efficiency, I'll process in batches
    # For the purpose of this task, I'll try to find images for ALL plants.
    
    headers = {
        "User-Agent": "PlantDownloaderBot/1.0 (contact: user@example.com)"
    }
    for plant in all_plants:
        s_name = plant['scientific_name_cleaned']
        print(f"Searching for {s_name}...")
        url = get_wikimedia_image_url(s_name)
        if url:
            plant_image_urls.append((plant['id'], s_name, url))
            print(f"Found: {url}")
        else:
            # Fallback search if exact scientific name doesn't have a page
            # Try searching for the name as a string
            search_url = "https://commons.wikimedia.org/w/api.php"
            params = {
                "action": "query",
                "format": "json",
                "list": "search",
                "srsearch": s_name + " plant",
                "srlimit": 1
            }
            try:
                res = requests.get(search_url, params=params, headers=headers)
                search_data = res.json()
                search_results = search_data.get("query", {}).get("search", [])
                if search_results:
                    title = search_results[0]['title']
                    # Get image from this title
                    params_img = {
                        "action": "query",
                        "format": "json",
                        "prop": "pageimages",
                        "titles": title,
                        "pithumbsize": 800
                    }
                    res_img = requests.get(search_url, params=params_img, headers=headers)
                    data_img = res_img.json()
                    pages_img = data_img.get("query", {}).get("pages", {})
                    for p_id in pages_img:
                        p = pages_img[p_id]
                        if "thumbnail" in p:
                            plant_image_urls.append((plant['id'], s_name, p["thumbnail"]["source"]))
                            print(f"Found via search: {p['thumbnail']['source']}")
                            break
            except:
                pass
        time.sleep(0.5) # Respect rate limits

    # Save the mapping to a file for the update script
    with open('plant_urls.json', 'w', encoding='utf-8') as f:
        json.dump(plant_image_urls, f, indent=2)
    
    print(f"Saved {len(plant_image_urls)} URLs to plant_urls.json")

    # Update src/data/plants.json
    for family in families:
        for plant in family['plants']:
            for p_id, s_name, url in plant_image_urls:
                if plant['id'] == p_id:
                    # Download the image here to have full control over filenames
                    # filename = plant_id + .jpg
                    output_dir = "public/images/plants"
                    if not os.path.exists(output_dir):
                        os.makedirs(output_dir)
                    
                    file_ext = ".jpg"
                    if "png" in url.lower(): file_ext = ".png"
                    elif "gif" in url.lower(): file_ext = ".gif"
                    
                    filename = f"plant_{p_id}{file_ext}"
                    filepath = os.path.join(output_dir, filename)
                    
                    if not os.path.exists(filepath):
                        print(f"Downloading {s_name} to {filename}...")
                        try:
                            # Use requests with delay
                            res = requests.get(url, headers=headers, stream=True)
                            if res.status_code == 200:
                                with open(filepath, 'wb') as img_f:
                                    for chunk in res.iter_content(1024):
                                        img_f.write(chunk)
                                print(f"  Done.")
                            else:
                                print(f"  Failed with status {res.status_code}")
                        except Exception as e:
                            print(f"  Error: {e}")
                        time.sleep(1) # More delay to avoid 429
                    
                    plant['image'] = f"/images/plants/{filename}"
                    break

    with open('src/data/plants.json', 'w', encoding='utf-8') as f:
        json.dump(families, f, indent=2, ensure_ascii=False)
    
    print("Updated src/data/plants.json with image paths.")

if __name__ == "__main__":
    main()
