import "./create.css"
import { useEffect, useState } from 'react'
import { useAuth } from '../../AuthProvider';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useMsg } from "../alert/alert-provider";
import Image from "../explore/image";

const Create = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const { setAlert } = useMsg();
  const [inputs, setInputs] = useState({});
  const [disableBtn, setDisableBtn] = useState(false);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
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
      id && img ? navigate(`/${id}`) : navigate("/");
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
      <div>
        <div className='create-form-container'>
          <form onSubmit={handleSubmit} className='create-form'>
            <input
              type="text"
              name="title"
              value={inputs.title || ""}
              placeholder='Title'
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              placeholder='description'
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              value={inputs.price || ""}
              placeholder='price'
              onChange={handleChange}
              required
            />
            {id && img ? (
              <>
                <div>
                  <Image image={img} imgHeight={200} imgWidth={300} imgObjFit="cover" />
                </div>
                <input
                  type="file"
                  name="image"
                  value={inputs.image || ""}
                  placeholder='Title'
                  onChange={handleChange}
                />
              </>
            ) : (
              <input
                type="file"
                name="image"
                value={inputs.image || ""}
                placeholder='Title'
                onChange={handleChange}
                required
              />
            )
            }
            <input
              type="text"
              name="location"
              value={inputs.location || ""}
              placeholder='location'
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              value={inputs.country || ""}
              placeholder='country'
              onChange={handleChange}
              required
            />
            <button type="submit" className='btn' disabled={disableBtn}>{!id ? (<span> Create!</span>) : (<span>Update!</span>)}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create;