import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';   
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Footer from './Footer';
import Header from './Header';



export default function ProductsDemo() {
    let emptyProduct = {
        id: null,
        name: '',
        senha: '',
        status: null
    };


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const status_user = [
        { name: 'Activo', value: 'Activo' },
        { name: 'Inativo', value: 'Inativo' }

       
    ];

     useEffect(() => {
      axios.get('http://localhost:8080/users')
      .then(response => setProducts(response.data));
   }, [product]);

     

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            console.log(_product);

            if (product.id) {
               axios.put('http://localhost:8080/users/update/'+product.id,_product)
                .then(response => {
                  {/*console.log(_product);*/}
                  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario Atualizado', life: 3000 });
                })
                .catch(error => {
                  console.log(error);
                });
               
            } else {
               axios.post('http://localhost:8080/users/create',_product)
              .then(response => {
                {/*console.log(_product);*/}
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario criado', life: 3000 });
              })
              .catch(error => {
                console.log(error);
              });
               
                
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        
            
        }

     
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
       
    };

    const deleteProduct = () => {
     
         let _product = { ...product };
        
          {/* console.log(_product.id);*/}

         {/*setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);*/}

        axios.delete('http://localhost:8080/users/'+_product.id )
        .then(response => {
        
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuario excluido', life: 3000 });
        })
        .catch(error => {
          console.log(error);
        });

        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        setProduct(_product);
   
       
    };


  const deleteSelectedProducts = () => {
        let ids = [];
        ids =  selectedProducts.map(item => (item.id))


        axios.delete('http://localhost:8080/items/users', { data: { ids: ids } })
      .then(response => {

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Usuarios excluidos', life: 3000 });
 
      })
      .catch(error => console.error(error));

      setDeleteProductsDialog(false);
      setSelectedProducts(null);
      setProduct(emptyProduct);
     

     };  
       

 
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };


    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


 

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button className="btn btn-outline-success btn-lg" label="Criar" icon="pi pi-plus" severity="success" onClick={openNew} />
                &nbsp;  &nbsp;  &nbsp;  &nbsp;
                <Button className="btn btn-outline-danger btn-lg" label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="btn btn-outline-info btn-lg" onClick={exportCSV} />;
    };

    const centerToolbarTemplate = () => {
        return   <h4 class="display-6">Usuarios   <i class="fas fa-users"></i></h4>
    };

    const actionBodyTemplate = (product) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil"  rounded outlined className=" btn btn-outline-info btn-sm" onClick={() => editProduct(product)} />
                &nbsp;
                <Button icon="pi pi-trash" rounded outlined severity="danger" className=" btn btn-outline-danger btn-sm" onClick={() => confirmDeleteProduct(product)} />
            </React.Fragment>
        );
    };


    const statusBodyTemplate = (product) => {
        return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product) => {
        switch (product.status) {
            case 'Activo':
                return 'success';

            case 'Inativo':
                return 'danger';


            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            
            
            <IconField iconPosition="left" >
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </IconField>
            
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" className="btn btn-outline-danger btn-sm" icon="pi pi-times" outlined onClick={hideDialog} />
            &nbsp;
            <Button label="Salvar" className="btn btn-outline-success btn-sm" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Não" className="btn btn-outline-danger btn-sm" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            &nbsp;
            <Button label="Sim" className="btn btn-outline-success btn-sm" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="Não" className="btn btn-outline-danger btn-sm"  icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            &nbsp;
            <Button label="Sim" className="btn btn-outline-success btn-sm"  icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const dataTable = {
        margin: "auto",
        padding: "15px",
        width: "1220px",
     };

    return (
     <div>
         <Header/>
        <br/>

       
        
    <div style={dataTable}>
       <Toast ref={toast} />
         <div className="card">
             <Toolbar className="mb-4" left={leftToolbarTemplate} center={centerToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    
             <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={8} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="#" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="name" header="Usuario" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="senha" header="senha" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="createdAt" header="Criado" sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="updatedAt" header="Editado"sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="status" header="Status"  body={statusBodyTemplate} sortable style={{ minWidth: '7rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '9rem' }}></Column>
                </DataTable>
    
    </div>
</div>   

<h1>{product.name}</h1>
{/************************************************************** MODALES ***************************************************************** */}


            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                
         
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nome de usuario
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Nome é obligatorio.</small>}
                </div>
              <div className="field">
                    <label htmlFor="senha" className="font-bold">
                       Senha
                    </label>
                    <InputText id="senha" value={product.senha} onChange={(e) => onInputChange(e, 'senha')} required rows={2} cols={20} />
                </div>

                <div className="field">
                    <label htmlFor="senha" className="font-bold">
                       Status
                    </label>
                        <Dropdown className="w-full md:w-14rem" id="status"  options={status_user} optionLabel="name"  value={product.status} onChange={(e) => onInputChange(e, 'status')} 
                        
                     />
                </div>
            
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Tem certeza de que quer excluir o usuario : <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Tem certeza de que quer excluir os usuarios seleccionados?</span>}
                </div>
            </Dialog>
        
          
        </div>
    );
}
        