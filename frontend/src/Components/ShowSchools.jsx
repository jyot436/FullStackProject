import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; // for school-card styles

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  // Fetch schools
  useEffect(() => {
    axios.get("http://localhost:5000/schools")
      .then(res => setSchools(res.data))
      .catch(err => console.error(err));
  }, []);

  // Delete school
  const deleteSchool = async (id) => {
    if (!window.confirm("Are you sure you want to delete this school?")) return;

    try {
      await axios.delete(`http://localhost:5000/school/${id}`);
      setSchools(schools.filter(s => s.id !== id)); // remove from UI
      alert("✅ School deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting school");
    }
  };

  return (
    <div className="school-list">
      {schools.map(school => (
        <div className="school-card" key={school.id}>
          <img src={`http://localhost:5000/schoolimages/${school.image}`} alt={school.name} />
          <h3>{school.name}</h3>
          <p>{school.address}, {school.city}, {school.state}</p>
          <p><b>Contact:</b> {school.contact}</p>
          <p><b>Email:</b> {school.email_id}</p>
          <button 
            onClick={() => deleteSchool(school.id)} 
            style={{ background: "red", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
