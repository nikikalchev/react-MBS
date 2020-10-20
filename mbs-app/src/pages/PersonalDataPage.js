import React, { useEffect, useState } from 'react';
import UserEdit from "../components/UserItem/UserEdit";
import { getLoggedInUserData } from '../service/utills';
import usersApi from "../service/users-api";
import "../components/UserItem/UserItem.css";

function PersonalDataPage({onRefresh}) {
    const [data, setData] = useState({});

    useEffect(() => {
        async function getUserData() {
            const personalInfo = getLoggedInUserData();
            const userData = await usersApi.getUserById(personalInfo._id);
            setData(userData);
        }
        getUserData();
    }, []);

    const pageMode = 'personalInfo';
    return (
        <div className="personalData">
            {Object.entries(data).length !== 0 ?
                <>
                    <img src="../../../images/users.png" id="user-image" alt="personalData" />
                    <UserEdit user={data} mode={pageMode} onRefresh={onRefresh}/>
                </>
                : <img src="../../../images/loading.gif" id="loading-image" alt="loading" />
            }
        </div>
    );
}

export default PersonalDataPage;