import React from 'react';

function RecyclingTips() {
  return (
    <div className="recycling-container">
      <h2 className="recycling-heading">Recycling Tips</h2>

      <div className="recycling-card">
        <h3 className="recycling-subheading">How to Recycle Effectively</h3>
        <ul className="recycling-list">
          <li><span className="recycling-bullet">•</span> Separate recyclables from general waste to ensure proper processing.</li>
          <li><span className="recycling-bullet">•</span> Rinse containers to remove food residue and prevent contamination.</li>
          <li><span className="recycling-bullet">•</span> Check local recycling guidelines for specific material requirements.</li>
          <li><span className="recycling-bullet">•</span> Compost organic waste like food scraps and yard waste to enrich soil.</li>
          <li><span className="recycling-bullet">•</span> Avoid contaminating recyclables with non-recyclable items like greasy pizza boxes.</li>
        </ul>
      </div>

      <div className="recycling-card">
        <h3 className="recycling-subheading">Why Recycling Matters</h3>
        <p className="recycling-text">
          Recycling reduces landfill use, conserves natural resources, and lowers carbon emissions. It also saves energy—recycling one aluminum can saves enough energy to power a TV for three hours!
        </p>
        <p className="recycling-text">
          By participating in ECOWASTE, you're contributing to a circular economy and protecting ecosystems for future generations.
        </p>
      </div>
    </div>
  );
}

export default RecyclingTips;
