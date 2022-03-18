const options = [
    'USERS',
    'APPOINTMENTS',
    'PATIENTS',
    'FINANCIALTRANSACTION',
    'INVENTORY',
    'SETTINGS'
]
module.exports = Object.freeze({

    settingsTabs: () => [
        {
            id: 'usersSettings',
            title: 'Users',
            icon: 'fas fa-users-cog',
        },
        {
            id: 'accessRights',
            title: 'Access Rights',
            icon: 'fas fa-key',
        },
        {
            id: 'apperance',
            title: 'Apperance',
            icon: 'fas fa-sliders-h',
        }
    ],
    accessRightsFormFormat: ({ usersRoles }) => {

        return [
            {
                label: 'Module',
                id: 'module',
                options,
                type: 'list',

            },
            {
                label: 'Roles',
                id: 'userRole',
                options: usersRoles,
                type: 'list'
            },
            {
                label: 'Read',
                id: 'read',
                type: 'checkbox'
            },
            {
                label: 'Create',
                id: 'create',
                type: 'checkbox'
            },
            {
                label: 'Write',
                id: 'write',
                type: 'checkbox'
            },
            {
                label: 'Remove',
                id: 'remove',
                type: 'checkbox'
            }
        ]
    },
    accessRightsUpdateFormFormat: ({ usersRoles }) => {

        return [
            {
                label: 'Module',
                id: 'module',
                options,
                type: 'list',

            },
            {
                label: 'Roles',
                id: 'userRole',
                options: usersRoles,
                type: 'list'
            },
            {
                label: 'Read',
                id: 'read',
                type: 'checkbox'
            },
            {
                label: 'Create',
                id: 'create',
                type: 'checkbox'
            },
            {
                label: 'Write',
                id: 'write',
                type: 'checkbox'
            },
            {
                label: 'Remove',
                id: 'remove',
                type: 'checkbox'
            }
        ]
    },
    userAccessUnitViewFormat: accessData => {

        const { module, userRole, read, create, write, remove,
            createdOn, modifiedOn } = accessData
        const createdOnFormat = new Date(createdOn);
        const modifiedOnFormat = new Date(modifiedOn);
        const dateOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        };

        const formatedUser = {
            Module: module,
            'User Role': userRole,
            Read: read,
            Create: create,
            Write: write,
            Remove: remove,
            'Created On': createdOnFormat.toLocaleDateString('en-EN', dateOptions),
            'Modified On': modifiedOnFormat.toLocaleDateString('en-EN', dateOptions),
        }

        return formatedUser;
    },

})