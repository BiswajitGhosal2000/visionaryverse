import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

import BlogContext from '../../context/blog/BlogContext';


export default function AddBlog() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [blog, setBlog] = React.useState({
        title: '',
        content: '',
        tag: 'General',
        contentImg: null
    });
    const { createBlog } = React.useContext(BlogContext);
    const handleChange = (e) => {
        e.preventDefault();
        setBlog({ ...blog, [e.target.name]: e.target.value })

    }
    const handleImageChange = (e) => {
        e.preventDefault();
        setBlog({ ...blog, contentImg: e.target.files[0] })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(blog)
        await createBlog(blog);
        alert("Blog Created Successfully");
        setBlog({
            title: '',
            content: '',
            tag: '',
            contentImg: null
        })
    }

    return (
        <div>
            <TriggerButton type="input" onClick={handleOpen} sx={{ width: 450, }}>
                Start a  Blog
            </TriggerButton>

            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}

            >
                <Box sx={style}>
                    <h2 id="unstyled-modal-title">Add New Blog</h2>
                    {/* <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p> */}
                    <form onSubmit={handleSubmit} className='row'>
                        <div className="mb-3 col-6">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} required value={blog.title} />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <select className="form-select" aria-label="Default select example" id='tag' name='tag' onChange={handleChange} required value={blog.tag}>
                                <option value="General">Select Tag Here</option>
                                <option value="Sports">Sports</option>
                                <option value="Technology">Technology</option>
                                <option value="Politics">Politics</option>
                                <option value="Science">Science</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health">Health</option>
                                <option value="Travel">Travel</option>
                                <option value="Food">Food</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea type="text" className="form-control" rows='8' id="content" name='content' onChange={handleChange} required value={blog.content} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Upload Image</label>
                            <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
                        </div>
                        <button type="submit" className="btn btn-primary my-1" >Submit</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const blue = {
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
    width: 600,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white',
    boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});

const TriggerButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);