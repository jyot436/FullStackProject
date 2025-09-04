import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Addschool.css";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);
    formData.append("image", data.image[0]);

      for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

    try {
      await axios.post("https://fullstackproject-2-yn0g.onrender.com/addSchool", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("✅ School added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding school");
    }
  };

  return (
  
  <div className="form-container">
    <h2>Add School</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="School Name" />
      {errors.name && <span>Name is required</span>}

      <input {...register("address", { required: true })} placeholder="Address" />
      <input {...register("city", { required: true })} placeholder="City" />
      <input {...register("state", { required: true })} placeholder="State" />

      <input {...register("contact", { required: true, pattern: /^[0-9]+$/ })} placeholder="Contact" />
      {errors.contact && <span>Only numbers allowed</span>}

      <input {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
      {errors.email_id && <span>Invalid email</span>}

      <input type="file" {...register("image", { required: true })} />

      <button type="submit">Add School</button>
    </form>
  </div>


  );
}
