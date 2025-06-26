import React from 'react';
import './WasteSortingGuide.css';

function WasteSortingGuide() {
  return (
    <div className="sorting-container">
      <h2 className="sorting-title">Waste Sorting Guide</h2>
      <p className="sorting-intro">
        Properly sorting your waste helps improve recycling efficiency and reduces environmental impact.
      </p>

      <div className="sorting-grid">
        {/* Organic Waste */}
        <div className="sorting-card organic">
          <h3>Organic Waste</h3>
          <ul>
            <li>Food scraps</li>
            <li>Vegetable peels</li>
            <li>Tea bags, coffee grounds</li>
            <li>Garden waste</li>
          </ul>
        </div>

        {/* Recyclable Waste */}
        <div className="sorting-card recyclable">
          <h3>Recyclables</h3>
          <ul>
            <li>Plastic bottles</li>
            <li>Glass jars</li>
            <li>Paper and cardboard</li>
            <li>Metal cans</li>
          </ul>
        </div>

        {/* General Waste */}
        <div className="sorting-card general">
          <h3>General Waste</h3>
          <ul>
            <li>Used tissues</li>
            <li>Sanitary products</li>
            <li>Broken ceramics</li>
            <li>Dust and dirt</li>
          </ul>
        </div>

        {/* Hazardous Waste */}
        <div className="sorting-card hazardous">
          <h3>Hazardous Waste</h3>
          <ul>
            <li>Batteries</li>
            <li>Paint cans</li>
            <li>Electronics (e-waste)</li>
            <li>Medical waste</li>
          </ul>
        </div>
      </div>

      <p className="sorting-tip">
        💡 Tip: Always rinse recyclables before disposing and keep dry waste separate from wet waste.
      </p>
    </div>
  );
}

export default WasteSortingGuide;
