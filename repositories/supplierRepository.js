import Supplier from "../models/supplierModel.js";

async function insertSupplier(supplier) {    
    try {
        return await Supplier.create(supplier);
    } catch (err) {
      throw  err;
    }  
}

async function getSuppliers() {
    try {
        return await Supplier.findAll();
    } catch (err) {
      throw  err;
    }  
}

async function getSupplier(id) {
    try {
        // return await Supplier.findByPk(id);
        return await Supplier.findOne({
            where: { supplierId: id }
        });
    } catch (err) {
      throw  err;
    }  
}

async function updateSupplier(supplier) {
    try {
          await Supplier.update(supplier, {
            where: {
                supplierId: supplier.supplierId
            }
        });

         // Depois, retorna o suppliere atualizado
         const updatedSupplier = await Supplier.findOne({
            where: { supplierId: supplier.supplierId }
        });

        return updatedSupplier;  // Retorna o suppliere atualizado
        // return await getSupplier(supplier.supplierId);
    } catch (err) {
      throw  err;
    }  
}

async function deleteSupplier(id) {
    try {
          await Supplier.destroy({
            where: {
                supplierId: id
            }
        });
    } catch (err) {
      throw  err;
    }    
}


export default {
    insertSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
}