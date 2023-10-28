
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const CategoryForm = ({ open, handleClose,navigate }) => {
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
      navigate('/login');
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '32ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <div className="flex items-start mb-2">
                                <div className="font-bold text-lg  text-gray-600">Category ID:</div>
                                <p className='ml-4 text-lg font-medium text-justify text-green-500'>SE101</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Category:</div>
                                <p className='ml-4 text-lg font-medium  text-justify text-gray-600'>Software Engineering</p>
                            </div>

                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Description:</div>
                                <p className='ml-4 text-lg font-medium text-justify text-gray-600'>Software engineering is a discipline that involves the systematic design, development, testing, and maintenance of software applications and systems. </p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Max Team Count:</div>
                                <p className='ml-4 text-lg font-medium text-justify text-gray-600'>50</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Registered Team Count:</div>
                                <p className='ml-4 text-lg font-medium text-justify text-gray-600'>6</p>
                            </div>
                            <div>
                                <Stack spacing={2} direction="row" className='mt-10'>
                                    <Button variant='outlined' color="error" >Close Registeration</Button>
                                </Stack>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default CategoryForm;
