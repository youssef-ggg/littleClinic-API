
module.exports = Object.freeze({
    updateModalSuccess:{
        title:'Save Changes',
        content:'Are you sure you want to save these changes!',
        buttons:[
            {
                id:'apply',
                name:'Apply',
            },
            {
                id:'cancel',
                name:'Cancel',
            }
        ]
    },
    deleteModal:(entityData)=>{
        return {
            title:`Delete ${entityData.title}`,
            content:`Are you sure you want delete this ${entityData.title}?`,
            buttons:[
                {
                    id:'confirm',
                    name:'Confirm'
                },
                {
                    id:'cancel',
                    name:'Cancel',
                }
            ]
        }
    },
    updateModalMatchOld:{
        title:'Nothing Changed',
        content:'No changes visabile to save!'
    }
});