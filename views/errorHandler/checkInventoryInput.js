module.exports = function inventoryErrorHandler({ commonInputError, renderFormError }) {

    function createInventoryItemErrorHandler(itemData) {
        let hasError = false
        const { invalidEmptyInputHandler } = commonInputError()

        const { name, unitCost, quantity, reorderQuantity } = itemData

        console.log(itemData)
        console.log(reorderQuantity)
        if (invalidEmptyInputHandler({ name })) {
            hasError = true
        }

        if (isNaN(unitCost)) {
            renderFormError({
                inputTitle: 'unitCost',
                message: 'Unit Cost must be an number',
                inputType: 'text'
            })
        } else if (unitCost <= 0) {
            renderFormError({
                inputTitle: 'unitCost',
                message: 'Unit Cost must be more then',
                inputType: 'text'
            })
            hasError = true
        }

        if (!Number.isInteger(quantity)) {
            renderFormError({
                inputTitle: 'quantity',
                message: 'Quantity must be an Integer',
                inputType: 'text'
            })
            hasError = true
        } else if (quantity < 1) {
            renderFormError({
                inputTitle: 'quantity',
                message: 'Quantity cannot be less then zero',
                inputType: 'text'
            })
            hasError = true
        }

        if (reorderQuantity) {
            if (!Number.isInteger(reorderQuantity)) {
                renderFormError({
                    inputTitle: 'reorderQuantity',
                    message: 'Reorder Quantity must be an Integer',
                    inputType: 'text'
                })
                hasError = true
            } else if (reorderQuantity < 0) {
                renderFormError({
                    inputTitle: 'reorderQuantity',
                    message: 'Reorder Quantity cannot be less then zero',
                    inputType: 'text'
                })
                hasError = true
            }
        }
        return hasError
    }

    return {
        createInventoryItemErrorHandler
    }
}