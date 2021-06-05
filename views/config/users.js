module.exports = Object.freeze({

    usersTableFormat: (usersList)=>{
        let newUserList = [];
        usersList.forEach(user => {
            const {id,username,name,occupation,accessRights} = user;
            newUserList.push({
                id:id,
                Username:username,
                Name:name,
                Occupation:occupation,
                'Access Rights':accessRights
            }); 
        });
        return newUserList;

    },
    userTableNavTabs:[
        {
            name:'Add User',
            id:'createModel',
            icon:'fas fa-pencil-ruler',
            type:'button'
        }
    ],
    usersFormFormat:[{
            label:'Username',
            id:'username',
            type:'text',
        },
        {
            label:'Name',
            id:'name',
            type:'text',
        },
        {
            label:'Occupation',
            id:'occupation',
            type:'text'
        },
        {
            label:'Password',
            id:'password',
            type:'password'
        },
        {
            label:'Confirm Password',
            id:'confirmPassword',
            type:'password'
        },
        {
            label:'Access Rights',
            id:'accessRights',
            type:'textArray'
        }

    ],
    usersUpdateFormFormat:[
        {
            label:'Username',
            id:'username',
            type:'text'
        },
        {
            label:'Name',
            id:'name',
            type:'text',
        },
        {
            label:'Occupation',
            id:'occupation',
            type:'text'
        },
        {
            label:'Access Rights',
            id:'accessRights',
            type:'textArray'
        }
    ],
    usersUpdatePasswordForm:[
        {
            label:'Old Password',
            id:'oldPassword',
            type:'password',
        },
        {
            label:'New Password',
            id:'password',
            type:'password'
        },
        {
            label:'Confirm New Password',
            id:'confirmPassword',
            type:'password'
        }
    ],
    userUnitViewFormat:userData=>{

        const {username,name,occupation,createdOn,modifiedOn,accessRights} = userData;
        const createdOnFormat = new Date(createdOn);
        const modifiedOnFormat = new Date(modifiedOn);
        const dateOptions = {
            month:'long',
            day:'numeric',
            year:'numeric'
        };

        const formatedUser = {
            'User Name':username,
            Name:name,
            Occupation:occupation,
            'Created On':createdOnFormat.toLocaleDateString('en-EN',dateOptions),
            'Modified On':modifiedOnFormat.toLocaleDateString('en-EN',dateOptions),
            'Access Rights':accessRights
        }

        return formatedUser;
    },
    userUnitLeftNav:[
        {
            name:'Change Password',
            id:'changeUsrpass',
            icon:'fas fa-user-lock'
        }
    ]
});