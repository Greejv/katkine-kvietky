import React from 'react';
import './AddPlantForm.css';

const AddPlantForm = () => {
  return (
    <div className="add-plant-page">
      <div className="container">
        <header className="form-header">
          <h1 className="headline-lg text-primary">Nový prírastok</h1>
          <p className="body-lg text-on-surface-variant">
            Zachyťte krásu vášho nového nálezu do digitálnej podoby.
          </p>
        </header>

        <div className="form-layout">
          <form className="main-form">
            <div className="form-card">
              <div className="form-group">
                <label className="label-md">Názov rastliny</label>
                <input type="text" placeholder="napr. Skorocel kopijovitý" className="form-input" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label-md">Dátum nálezu</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="label-md">Lokalita</label>
                  <div className="input-with-icon">
                    <span className="material-symbols-outlined input-icon">location_on</span>
                    <input type="text" placeholder="napr. Malé Karpaty" className="form-input icon-padding" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="label-md">Poznámky</label>
                <textarea 
                  placeholder="Podrobnosti o prostredí, vôni alebo liečivých vlastnostiach..." 
                  className="form-textarea" 
                  rows="5"
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-btn pressing-effect">
              Uložiť do herbára
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <aside className="form-sidebar">
            <div className="upload-box">
              <div className="upload-icon">
                <span className="material-symbols-outlined">add_a_photo</span>
              </div>
              <h4 className="headline-sm">Pridajte fotografie</h4>
              <p className="label-md lowercase">Potiahnite obrázok sem alebo kliknite pre výber</p>
            </div>

            <div className="tip-box">
              <div className="tip-header">
                <span className="material-symbols-outlined tip-icon">tips_and_updates</span>
                <span className="label-md">Tip pre zberateľa</span>
              </div>
              <p className="tip-text">
                Najlepšie fotografie vznikajú pri rannom mäkkom svetle. Skúste zachytiť aj detail listov pre ľahšiu identifikáciu v budúcnosti.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddPlantForm;
