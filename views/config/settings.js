
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
                options: [
                    'USERS',
                    'APPOINTMENTS',
                    'PATIENTS',
                    'FINANCIALTRANSACTION',
                    'INVENTORY',
                    'SETTINGS'
                ],
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
    }

})