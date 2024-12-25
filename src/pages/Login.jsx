import React, { useState } from 'react';
import { backend } from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import show from '../assets/show.svg';
import hide from '../assets/hide.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();

  function validate() {
    if (!username.trim()) {
      alert('Iltimos, username ni kiriting!');
      return false;
    }
    if (username.trim().length < 5) {
      alert('Username kamida 5 ta belgidan iborat bo‘lishi kerak!');
      return false;
    }
    if (!password.trim()) {
      alert('Iltimos, password ni kiriting!');
      return false;
    }
    if (password.trim().length < 5 || password.trim().length > 15) {
      alert('Password 5-15 ta belgidan iborat bo‘lishi kerak!');
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const user = {
      username: username.trim(),
      password: password.trim(),
    };

    setLoading(true);

    backend
      .post('auth/signin', user, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.accessToken);
          navigate('/', { state: { token: response.data.accessToken } });
        }
      })
      .catch((err) => {
        if (err.response?.status === 400 || err.response?.status === 404) {
          alert('Siz hali ro‘yxatdan o‘tmagansiz!');
          navigate('/register');
        } else {
          alert('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring!');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 mx-auto w-full max-w-[400px] h-lvh'>
      <h1 className='text-[30px]'>Login</h1>
      <input
        className='input-bordered w-full input input-info'
        type='text'
        value={username}
        minLength={5}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter your username..'
      />
      <div className='flex justify-between items-center input-bordered w-full input input-info'>
        <input
          className='w-full'
          minLength={5}
          maxLength={15}
          type={isShow ? 'password' : 'text'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password..'
        />
        <img
          onClick={() => setIsShow(!isShow)}
          className='cursor-pointer'
          src={isShow ? show : hide}
          alt='toggle visibility'
        />
      </div>
      <button type='submit' className='w-full uppercase btn btn-info btn-outline' disabled={loading}>
        {loading ? 'Loading..' : 'Login'}
      </button>
      <div className='flex justify-center items-center gap-[15px] mt-[-10px] w-full'>
        <p className='text-[15px]'>Not a member yet?</p>
        <Link to={'/register'} className='text-blue-500 hover:underline'>
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;
