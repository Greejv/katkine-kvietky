import logo from '../assets/lgogo.jpg';
import Reveal from './Reveal';
import './About.css';

const SOURCES = [
  ['1. Magnolia grandiflora', 'https://upload.wikimedia.org/wikipedia/commons/2/21/Magnolia_grandiflora%2C_by_Mary_Vaux_Walcott.jpg'],
  ['2. Liriodendron tulipifera', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Liriodendron_tulipifera_Fall.jpg'],
  ['3. Magnolia stellata', 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Star_magnolia_8854.JPG'],
  ['4. Magnolia kobus', 'https://upload.wikimedia.org/wikipedia/commons/7/75/Magnolia_kobus_borealis0.jpg'],
  ['5. Magnolia liliiflora', 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Mulan_2.jpg'],
  ['6. Anemone nemorosa', 'https://upload.wikimedia.org/wikipedia/commons/8/81/Windflower.jpg'],
  ['7. Pulsatilla pratensis', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Pulsatilla_pratensis.jpeg'],
  ['8. Aconitum napellus', 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Aconit.jpg'],
  ['9. Ranunculus acris', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Meadow_%28Ranunculus%29.jpg/960px-Meadow_%28Ranunculus%29.jpg'],
  ['10. Caltha palustris', 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Sumpfdotterblume-2.jpg'],
  ['11. Papaver somniferum', 'https://upload.wikimedia.org/wikipedia/commons/7/77/Crowning_P_Somniferum_topview.jpg'],
  ['12. Papaver rhoeas', 'https://upload.wikimedia.org/wikipedia/commons/2/21/Andal%C3%BAziapipacs.jpg'],
  ['13. Chelidonium majus', 'https://upload.wikimedia.org/wikipedia/commons/5/54/Vla%C5%A1tovi%C4%8Dn%C3%ADk.jpg'],
  ['14. Fumaria officinalis', 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Fumaria_officinalis_jordr%C3%B6k.jpg'],
  ['15. Lamprocapnos spectabilis', 'https://upload.wikimedia.org/wikipedia/commons/9/99/2006-04-26Dicentra_spectabilis01.jpg'],
  ['16. Nymphaea alba', 'https://upload.wikimedia.org/wikipedia/commons/9/92/Nymphaea_alba_close_up.jpg'],
  ['17. Nuphar lutea', 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Nuphar_lutea.jpg'],
  ['18. Nymphaea candida', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Nymphaea_alba_250607.jpg/960px-Nymphaea_alba_250607.jpg'],
  ['19. Victoria amazonica', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Vitoria_regia.jpg/960px-Vitoria_regia.jpg'],
  ['20. Euryale ferox', 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Euryale_ferox.jpg'],
  ['21. Fagus sylvatica', 'https://upload.wikimedia.org/wikipedia/commons/7/7c/B%C3%B8keskog2.jpg'],
  ['22. Quercus robur', 'https://upload.wikimedia.org/wikipedia/commons/9/91/DikkeboomLaren.jpg'],
  ['23. Castanea sativa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/2006-07-20_10-14-43_Switzerland_Graubunden_Castasegna.jpg/960px-2006-07-20_10-14-43_Switzerland_Graubunden_Castasegna.jpg'],
  ['24. Quercus cerris', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Quercus_cerris_Lovech%2C_Bulgaria_1.jpg/960px-Quercus_cerris_Lovech%2C_Bulgaria_1.jpg'],
  ['25. Quercus petraea', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Altersvergleich.jpg'],
  ['26. Betula pendula', 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Betula_aetnensis.jpg'],
  ['27. Alnus glutinosa', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Erlensterben.jpg'],
  ['28. Betula nana', 'https://upload.wikimedia.org/wikipedia/commons/6/61/Betula_nana0.jpg'],
  ['29. Alnus incana', 'https://upload.wikimedia.org/wikipedia/commons/4/40/Leppa_kukkii.jpg'],
  ['30. Betula pubescens', 'https://upload.wikimedia.org/wikipedia/commons/0/06/1911_Britannica-Birch-Betula_alba.png'],
  ['31. Corylus avellana', 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Corylus_avellana_lindman_3.jpg'],
  ['32. Carpinus betulus', 'https://upload.wikimedia.org/wikipedia/commons/4/40/Carpinus-betulus-Ekkodalen.jpg'],
  ['33. Corylus colurna', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Corylus_colurna0.jpg/960px-Corylus_colurna0.jpg'],
  ['34. Carpinus orientalis', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Carpinus_orientalis_foliage_Bulgaria_1.jpg/960px-Carpinus_orientalis_foliage_Bulgaria_1.jpg'],
  ['35. Ostrya carpinifolia', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ostrya_carpinifolia_JPG1a.jpg/960px-Ostrya_carpinifolia_JPG1a.jpg'],
  ['36. Tilia cordata', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Tassilo-Linde.jpg'],
  ['37. Tilia platyphyllos', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Sommerlinde.jpg'],
  ['38. Tilia tomentosa', 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Tilia_tomentosa12.JPEG'],
  ['39. Tilia euchlora', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tilia_euchlora1.JPG/960px-Tilia_euchlora1.JPG'],
  ['40. Tilia americana', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Tilia_americana_NRCS-1.jpg/960px-Tilia_americana_NRCS-1.jpg'],
];

const FEATURES = [
  { icon: 'biotech', title: 'Morfológia', text: 'Detailný popis stavby, listov a kvetov každého druhu.' },
  { icon: 'public', title: 'Výskyt', text: 'Prirodzený areál a rozšírenie rastlín v krajine.' },
  { icon: 'medical_services', title: 'Využitie', text: 'Liečivé, okrasné aj praktické využitie druhov.' },
  { icon: 'auto_awesome', title: 'Zaujímavosti', text: 'Fascinujúce fakty zo sveta botaniky.' },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <Reveal as="section" className="about-hero">
        <div className="about-logo-frame">
          <img src={logo} alt="Projekt Logo" className="about-logo" />
        </div>
        <div className="about-hero-text">
          <span className="hero-eyebrow">
            <span className="material-symbols-outlined">eco</span> O projekte
          </span>
          <h1 className="headline-lg">Digitálny herbár</h1>
          <p className="body-lg">
            Vitajte v našom interaktívnom botanickom sprievodcovi. Tento projekt vznikol
            ako súčasť predmetu Biológia pod vedením pani učiteľky Hrubej. Naším cieľom
            bolo vytvoriť modernú platformu na spoznávanie rastlín, ktorá kombinuje
            odborné informácie s vysokokvalitným vizuálnym obsahom.
          </p>
        </div>
      </Reveal>

      {/* Vision */}
      <Reveal as="section" className="about-vision liquid-glass">
        <h3 className="headline-sm text-primary">Naša vízia</h3>
        <p className="body-md">
          Chceme priblížiť krásu a rozmanitosť flóry každému študentovi. Digitálna forma
          nám umožňuje rýchlo vyhľadávať informácie a neustále dopĺňať nové poznatky
          o svete rastlín.
        </p>
      </Reveal>

      {/* What you'll find */}
      <section className="about-features">
        {FEATURES.map((f, i) => (
          <Reveal as="div" key={f.title} delay={i * 80} className="feature-card liquid-glass">
            <div className="feature-icon"><span className="material-symbols-outlined">{f.icon}</span></div>
            <h4>{f.title}</h4>
            <p>{f.text}</p>
          </Reveal>
        ))}
      </section>

      {/* Sources */}
      <section className="sources-section">
        <h2 className="headline-sm text-primary">Zdroje obrázkov</h2>
        <p className="body-md mb-4">
          Všetky obrázky použité v tejto aplikácii sú prevzaté z Wikimedia Commons:
        </p>
        <ul className="sources-list">
          {SOURCES.map(([label, url]) => (
            <li key={label}>
              {label}:{' '}
              <a href={url} target="_blank" rel="noopener noreferrer">Odkaz</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default About;
