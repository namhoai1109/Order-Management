import { deleteStaff, addStaff, getStaffs, getShippers, updateStatus } from './callers';

export const AuseDelelteStaff = async (id) => {
    try {
        const response = await deleteStaff(id);
        const result = response.data;
        if (result.status === "success") {
            console.log(`Staff with id ${id} has been deleted`);
        } else {
            console.log(`Failed to delete staff with id ${id}`);
        }
    } catch (error) {
        console.log(error);
    }
};


export const useAddStaff = async (staff, token) => {
    try {
        const response = await addStaff(staff, token);
        const result = response.data;
        if (result.status === "success") {
            console.log(`Staff with id ${result.result.id} has been added`);
        } else {
            console.log(`Failed to add staff`);
        }
    } catch (error) {
        console.log(error);
    }
};


export const useGetStaffs = async (setData, token) => {
    try {
        const response = await getStaffs(token);
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

export const useGetShippers = async (setData, token) => {
    try {
        const response = await getShippers(token);
        const result = response.data;
        const shippers = [];

        result.result.forEach(user => {
            if (user.role === "shipper") {
                shippers.push({
                    id: user.id,
                    name: user.name,
                    cmnd: user.cmnd,
                    phone: user.phone,
                    address: user.address,
                    license: user.licensePlate,
                    area: user.area,
                    email: user.email,
                    bank: user.bank,
                });
            }
        });
        setData(shippers);

    } catch (error) {
        console.log(error);
    }
};

export const useUpdateStatus = async (id) => {
    try {
        const response = await updateStatus(id);
        const result = response.data;
        if (result.status === "success") {
            console.log(`Staff with id ${id} has been updated`);
        } else {
            console.log(`Failed to update staff with id ${id}`);
        }
    } catch (error) {
        console.log(error);
    }

}





