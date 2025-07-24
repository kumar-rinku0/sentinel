import "./create.css";
// import "./image-preview.js";
import { useEffect, useState } from 'react'
import { useAuth } from '../../AuthProvider';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useMsg } from "../alert/alert-provider";
import Image from "../explore/image";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Create = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const { setAlert } = useMsg();
  const [inputs, setInputs] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  const [img, setImg] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === 'image') {
      setSelectedImg(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    setInputs(values => ({ ...values, [name]: value }))
  }
  const handleSubmit = (e) => {
    setDisableBtn(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const listing = Object.fromEntries(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post(id && img ? `/api/listings/${id}/edit` : "api/listings/create", listing, config).then((res) => {
      console.log(res.data);
      const { msg, type } = res.data;
      setAlert([msg, type, true]);
      id && img ? navigate(`/listing/${id}`) : navigate("/");
      setDisableBtn(false);
    }).catch((err) => {
      console.log(err.response.data);
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
      setDisableBtn(false);
    })
  }
  useEffect(() => {
    if (id) {
      axios.get(`/api/listings/${id}/edit`).then((res) => {
        const listing = res.data.listing;
        setImg(listing.image);
        setInputs(values => ({ values, title: listing.title, price: listing.price, description: listing.description, location: listing.location.value, country: listing.location.country }))
      }).catch((err) => {
        console.error(err.response.data);
      })
    }
  }, [id])
  if (!isAuthenticated) {
    return (
      <div className='create'>
        <div>
          Not Authorized!
        </div>
      </div>
    )
  }
  return (
    <div className='create'>
      <div className="create-page">
        <div className='create-form-container'>
          <form onSubmit={handleSubmit} className='create-form'>
            <TextField
              variant="standard"
              type="text"
              name="title"
              value={inputs.title || ""}
              label='Title'
              onChange={handleChange}
              required
            />

            <TextField
              variant="standard"
              type="text"
              name="description"
              value={inputs.description || ""}
              label='description'
              onChange={handleChange}
              required
            />
            <TextField
              style={{ margin: "0 0 1rem 0" }}
              variant="standard"
              type="number"
              name="price"
              value={inputs.price || ""}
              label='price'
              onChange={handleChange}
              required
            />
            {id && img ? (
              <>
                <div>
                  <Image image={img} imgHeight={200} imgWidth={300} imgObjFit="cover" />
                </div>
                <div className="custom__image-container">
                  {/* <label htmlFor="image">upload image</label> */}
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    value={inputs.image || ""}
                    onChange={handleChange}
                  />
                </div>
                {selectedImg && (
                  <div className="preview">
                    <img src={URL.createObjectURL(selectedImg)} alt="selectedImg" />
                    {returnFileSize(selectedImg.size)}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="custom__image-container">
                  {/* <label htmlFor="image">upload image</label> */}
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    value={inputs.image || ""}
                    label='Title'
                    onChange={handleChange}
                    required
                  />
                </div>
                {selectedImg && (
                  <div className="preview">
                    <img src={URL.createObjectURL(selectedImg)} alt="selectedImg" />
                    {returnFileSize(selectedImg.size)}
                  </div>
                )}
              </>
            )
            }
            <TextField
              variant="standard"
              type="text"
              name="location"
              value={inputs.location || ""}
              label='location'
              onChange={handleChange}
              required
            />
            <TextField
              variant="standard"
              type="text"
              name="country"
              value={inputs.country || ""}
              label='country'
              onChange={handleChange}
              required
            />
            <Button style={{ marginTop: "0.5rem" }} variant="outlined" type="submit" className='btn' disabled={disableBtn}>{!id ? (<span> Create!</span>) : (<span>Update!</span>)}</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

const returnFileSize = (number) => {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  } else {
    return `${(number / 1e6).toFixed(1)} MB`;
  }
}

export default Create;