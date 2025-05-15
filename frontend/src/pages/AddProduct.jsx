import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import {
  FormWrapper,
  StyledInput,
  StyledTextArea,
  StyledButton,
  ErrorText,
  ImagePreview
} from "../Style.styled";


function AddProduct({ onSuccess, onCancel }) {
  const { register, handleSubmit, formState: { errors }, watch} = useForm();
  const [imagePreview, setImagePreview] = useState("");
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post("/new", data);
      setServerError("");
      onSuccess?.(); // refresh product list
    } catch (err) {
      setServerError(err.response?.data?.error || "Failed to add product.");
    }
  };

  const handleImageBlur = async () => {
    const id = watch("imageID");

    try {
      const res = await axios.get(`/image-url/${id}`);
      const url = `http://localhost:3001${res.data.imageURL}`;
      console.log("Setting image preview to:", url);
      setImagePreview(url);
    } catch {
      const fallback = "http://localhost:3001/images/default.png";
      console.log("Error fetching image, using fallback:", fallback);
      setImagePreview(fallback);
    }
  };


  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
  <h2>Add New Product</h2>

  <label>Product Name</label>
  <StyledInput {...register("name", { required: "Product name is required" })} />
  {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

  <label>Description</label>
  <StyledTextArea {...register("description", { required: "Description is required" })} />
  {errors.description && <ErrorText>{errors.description.message}</ErrorText>}

  <label>Price</label>
  <StyledInput
    type="number"
    step="0.01"
    {...register("price", {
      required: "Price is required",
      min: { value: 0.01, message: "Price must be greater than 0" }
    })}
  />
  {errors.price && <ErrorText>{errors.price.message}</ErrorText>}

  <label>Image ID</label>
  <StyledInput {...register("imageID")} onBlur={handleImageBlur} />
  {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}

  {serverError && <ErrorText>{serverError}</ErrorText>}

  <StyledButton type="submit">Add Product</StyledButton>
  <StyledButton type="button" onClick={onCancel} style={{ backgroundColor: "#888" }}>
    Cancel
  </StyledButton>
</FormWrapper>

  );
}

export default AddProduct;
