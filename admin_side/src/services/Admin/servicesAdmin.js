import axios from '../../api/axios';

// delete staff when click button delete
const deleteStaff = async (id) => {
    try {
        const response = await axios.delete(`/api/admin/delete-staff/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "withCredentials": true,
            },
        });

        // handle success case
        console.log(`Staff with id ${id} has been deleted`);
    } catch (error) {
        // handle error case
        console.log(`Failed to delete staff with id ${id}: ${error.message}`);
    }

};

const addStaff = async (staff, token) => {
    const { username, password, email, phone, name } = staff;
    try {
        const response = await axios.post(
            "/api/admin/register-staff",
            {
                username: username,
                password: password,
                email: email,
                phone: phone,
                name: name,
            },
            {
                headers: {
                    authorization: "Bearer " + token,
                    withCredentials: true,
                },
            }
        );
        // handle success case
        console.log(`Staff with username ${username} has been added`);
    } catch (error) {
        // handle error case
        console.log("test: " + username, password, email, phone, name)
        console.log(`Failed to add staff with username ${username}: ${error.message}`);
    }
};


const getAllStaff = async (setData, token) => {
    try {
        const response = await axios.get("/api/admin/get-staffs", {
            headers: {
                authorization: "Bearer " + token,
            },
        });

        const result = response.data;
        const staffs = result.result.map(user => ({
            id: user.id,
            username: user.username,
            password: user.password,
        }));
        setData(staffs);
    } catch (error) {
        console.log(error);
    }
};

const getAllShipper = async (setData, token) => {
    try {
        const response = await axios({
            method: "GET",
            url: "/api/admin/get-all",
            headers: {
                authorization: "Bearer " + token,
            }
        });

        const result = response.data;
        const shippers = result.result.map(user => ({
            id: user.id,
            name: user.name,
            cmnd: user.cmnd,
            phone: user.phone,
            address: user.address,
            license: user.license,
            area: user.area,
            email: user.email,
            bank: user.bank,
        }));
        setData(shippers);
    } catch (error) {
        console.log(error);
    }
};

// const getAllPartner = async (setData, token) => {
//     try {
//         const response = await axios({
//             method: "GET",
//             url: "/api/admin/get-all",
//             headers: {
//                 authorization: "Bearer " + token,
//             }
//         });

//         const result = response.data;
//         const partners = result.result.map(user => ({
//             id: user.id,
//             name: user.name,
//             cmnd: user.cmnd,
//             phone: user.phone,
//             address: user.address,
//             license: user.license,
//             area: user.area,
//             email: user.email,
//             bank: user.bank,
//         }));
//         setData(partners);
//     } catch (error) {
//         console.log(error);
//     }
// };




export { deleteStaff, addStaff, getAllStaff, getAllShipper }


