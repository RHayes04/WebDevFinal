import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FormWrapper,
  StyledInput,
  StyledTextArea,
  StyledButton,
  ErrorText,
  ImagePreview
} from "../Style.styled";

function EditProduct({ product, onSuccess, onCancel }) {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [imagePreview, setImagePreview] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (product) {
      reset({
        name: product.prod_name,
        description: product.description,
        price: product.price,
        imageID: product.imageID,
      });
      setImagePreview(`http://localhost:3001${product.imageURL}`);
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.post("/edit", {
        product_id: product.product_id,
        ...data,
      });
      setServerError("");
      onSuccess?.(); // refresh list
    } catch (err) {
      setServerError(err.response?.data?.error || "Failed to update product.");
    }
  };

  const handleImageBlur = async () => {
    const id = watch("imageID");
    try {
      const res = await axios.get(`/image-url/${id}`);
      setImagePreview(`http://localhost:3001${res.data.imageURL}`);
    } catch {
      setImagePreview("http://localhost:3001/images/default.png");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Product</h2>

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

      <StyledButton type="submit">Update Product</StyledButton>
      <StyledButton type="button" onClick={onCancel} style={{ backgroundColor: "#888" }}>
        Cancel
      </StyledButton>
    </FormWrapper>
  );
}

export default EditProduct;
