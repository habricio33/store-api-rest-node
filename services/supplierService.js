import supplierRepository from "../repositories/supplierRepository.js"

async function createSupplier(supplier) {
    return await supplierRepository.insertSupplier(supplier);
}

async function getSuppliers() {
    return await supplierRepository.getSuppliers();
}

async function getSupplier(id) {
    return await supplierRepository.getSupplier(id);
}

async function deleteSupplier(id) {
     await supplierRepository.deleteSupplier(id);
}

async function updateSupplier(supplier) {
    await supplierRepository.updateSupplier(supplier);
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}