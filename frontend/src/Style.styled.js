import styled from 'styled-components';

/* ========== Layout & Navigation ========== */

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  gap: 20px;
`;

export const TopLink = styled.a`
  padding: 5px 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PageTitle = styled.h1`
  background-color: #007bff;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
`;

/* ========== Product List ========== */

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

export const ProductCard = styled.div`
  background-color: #fff;
  padding: 15px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  box-sizing: border-box;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 280px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 4px;
  object-fit: cover;
`;

export const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #007bff;
  padding: 5px;

  &:hover {
    color: #0056b3;
  }
`;

/* ========== Forms (Add/Edit Product) ========== */

export const FormWrapper = styled.form`
  padding: 40px;
  margin: 0 auto 30px;
  max-width: 500px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9em;
  margin: -5px 0 10px;
`;

export const ImagePreview = styled.img`
  width: 200px;
  margin-bottom: 10px;
  border-radius: 6px;
`;
