import React from "react";
import '../styles/FAQ.css';
import { useState } from "react";

export default function FAQ() {
    const [selected, setSelected] = useState(null)
    const toggle = i =>{
        if(selected===i){
            return setSelected(null)
        }

        setSelected(i)
    }
    return (
      <div className="wrapper">
        <div className="accordion">
          {faq.map((item, i) => (
            <div className="item" key={i}>
              <div className="title" onClick={()=>toggle(i)}>
                <h2>{item.question}</h2>
                <span>{selected===i? '-' : '+'}</span>
              </div>
              <div className={selected===i? 'content show' : 'content'}>{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

const faq= [
      {
        "question": "What is ITI's new capital city?",
        "answer": "ITI's new capital city is a purpose-built, modern city designed to become the administrative and economic hub of the country. It is equipped with state-of-the-art infrastructure and facilities to support businesses, government offices, and residential communities."
      },
      {
        "question": "Why is the new capital city being developed?",
        "answer": "The new capital city is being developed to alleviate congestion in the current capital, distribute population more evenly, and create a hub for innovation, business, and government operations. It aims to support the growing population and economic activities with better-planned infrastructure."
      },
      {
        "question": "Where is the new capital city located?",
        "answer": "The exact location details of ITI's new capital city can vary, but it is typically situated in a strategic area with ample space for expansion and development. Please refer to the latest official announcements or maps for precise location information."
      },
      {
        "question": "What facilities and amenities will be available in the new capital city?",
        "answer": "The new capital city will feature: Government offices and administrative buildings, Residential areas with housing options for various income levels, Commercial zones with shopping centers, restaurants, and entertainment venues, Educational institutions including schools and universities, Healthcare facilities such as hospitals and clinics, Parks, recreational areas, and sports facilities, Advanced transportation networks including roads, public transit, and possibly airports."
      },
      {
        "question": "When will the new capital city be completed?",
        "answer": "The completion timeline for the new capital city varies depending on the phase of development. Initial phases may be operational within a few years, while full completion can take a decade or more. Stay updated with official sources for the most accurate timelines."
      },
      {
        "question": "How can businesses and individuals invest in the new capital city?",
        "answer": "Investment opportunities in the new capital city can include purchasing property, setting up businesses, and participating in public-private partnerships. Interested parties should contact the designated authorities or investment agencies for detailed information and procedures."
      },
      {
        "question": "What are the environmental considerations for the new capital city?",
        "answer": "The new capital city is planned with sustainability in mind, incorporating green spaces, energy-efficient buildings, and waste management systems. Efforts are made to minimize the environmental impact and promote eco-friendly practices."
      }
    ]
  
  