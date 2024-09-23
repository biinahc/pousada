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
import Header from './Header';





export default function ProductsDemo() {
    let emptyProduct = {
        id: null,
        tipo_producto: null,
        nome: '',
        quantidade: '',
        lt_kl_unid: '',
        marca: '',
        saida: '',
        status: ''
    };


    const [products, setProducts] = useState(null);
    const [inputStatus, setInputstatus] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [saidaDialog, setSaidaDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [bandeiraInput, setBandeiraInput] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
   
 
   
    

    const tipo_compra = [
        { name: 'Kilos', value: 'Kilos' },
        { name: 'Litros', value: 'Litros' },
        { name: 'Unidades', value: 'Unidades' }

       
    ];
    const tipoproducto = [
        { name: 'Alimentos', value: 'Alimento' },
        { name: 'Limpeza', value: 'Limpeza' },
        { name: 'Utensílios Gerais', value: 'Utensilios Gerais' }

       
    ];

     useEffect(() => {
      axios.get('http://localhost:8080/produtos')
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
        setSaidaDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


   

    const saveProduct = () => {
        setSubmitted(true);

      

        if (product.nome.trim()) {
            let _products = [...products];
            let _product = { ...product };

            console.log(_product);

            

   if (product.id) {
    axios.put('http://localhost:8080/produtos/update/'+product.id,_product)
     .then(response => {
       {/*console.log(_product);*/}
       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Atualizado', life: 3000 });
     })
     .catch(error => {
       console.log(error);
     });
    
 } else {
    axios.post('http://localhost:8080/produtos/create',_product)
   .then(response => {
     console.log(_product);
     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item criado !!', life: 3000 });
   })
   .catch(error => {
     console.log(error);
   });
    
     
 }

          setProduct(emptyProduct);
          setProductDialog(false);
          setProducts(_products);
            
        
            
        }

     
    };



    const saveSaida = () => {
        setSubmitted(true);
        let _product = { ...product };
      
      console.log(product);

      if(product.saida > product.status){
        toast.current.show({ severity: 'warn', summary: 'Observação', detail: 'Saida é maior que a quantidade atual', life: 4000 });

      }else{
        axios.put('http://localhost:8080/produtos/update/'+product.id,_product,_product.bandeira = 1)
        .then(response => {
       
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Saida cadastrada', life: 3000 });
        })
        .catch(error => {
          console.log(error);
        });
  
          
            setSaidaDialog(false);
            setProduct(emptyProduct);

      }
     };



    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const saidaProdut = (product) => {
        setProduct({ ...product });
        setSaidaDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
       
    };

    const deleteProduct = () => {
     
         let _product = { ...product };
   

        axios.delete('http://localhost:8080/produtos/'+_product.id )
        .then(response => {
        
          toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item excluido', life: 3000 });
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


        axios.delete('http://localhost:8080/items/produtos', { data: { ids: ids } })
      .then(response => {

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Items excluidos', life: 3000 });
 
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


    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${nome}`] = val;
     

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
        return   <h4 class="display-6">Produtos<i class="fas fa-shopping-cart"></i></h4>
    };


    const actionBodyTemplate = (product) => {
        return (
            <React.Fragment>
                 <Button icon="pi pi-upload" rounded outlined severity="warning" className=" btn btn-outline-warning btn-sm" onClick={() => saidaProdut(product)} />
                 &nbsp;
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
     
         if(product.status >= 10){
            return 'success';
        }else if (product.status < 10 && product.status >=5 ){
            return 'warning';

        }else if(product.status < 5 ){
            return 'danger';
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
    const saidatDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" className="btn btn-outline-danger btn-sm" icon="pi pi-times" outlined onClick={hideDialog} />
            &nbsp;
            <Button label="Salvar" className="btn btn-outline-success btn-sm" icon="pi pi-check" onClick={saveSaida} />
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
        padding: "10px",
      
      
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
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="#" sortable style={{ minWidth: '3rem' }}></Column>
                    <Column field="tipo_producto" header="Tipo de Produto" sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="nome" header="Nome" sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="quantidade" header="Quant." sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="lt_kl_unid" header="LT-KL-UNID" sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="marca" header="Marca" sortable style={{ minWidth: '6rem' }}></Column>
                    <Column field="createdAt" header="Criado" sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="updatedAt" header="Editado"sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="status" header="Status"  body={statusBodyTemplate} sortable style={{ minWidth: '6rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '9rem' }}></Column>
                </DataTable>
    
    </div>
</div>   
{/************************************************************** MODALES ***************************************************************** */}


            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Produto" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                

            <div className="field">
                    <label htmlFor="senha" className="font-bold">
                    Tipo de Produto
                    </label>
                        <Dropdown className="w-full md:w-14rem" id="tipo_producto"  options={tipoproducto} optionLabel="name" required autoFocus  value={product.tipo_producto} onChange={(e) => onInputChange(e, 'tipo_producto')} 
                        
                     />
                </div>
         
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                       Nome
                    </label>
                    <InputText id="nome" value={product.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nome })} />
                    {submitted && !product.name && <small className="p-error">Nome é obligatorio.</small>}
                </div>
              <div className="field">
                  
                    {product.id ?
                        
                      <InputText  hidden type="number"  disabled   id="quantidade" value={product.quantidade} onChange={(e) => onInputChange(e, 'quantidade')}  equired   rows={2} cols={20} />

                     :
                     <><label htmlFor="quantidade" className="font-bold">
                     Quantidade
                  </label>
                    <InputText type="number" id="quantidade" value={product.quantidade} onChange={(e) => onInputChange(e, 'quantidade')}  equired   rows={2} cols={20} />
                    </>
                    }
                    
                </div>
            
                <div className="field">
                    <label htmlFor="senha" className="font-bold">
                    Por:
                    </label>
                        <Dropdown className="w-full md:w-14rem" id="lt_kl_unid"  options={tipo_compra} optionLabel="name" required autoFocus  value={product.lt_kl_unid} onChange={(e) => onInputChange(e, 'lt_kl_unid')} 
                        
                     />
                </div>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                       Marca
                    </label>
                    <InputText id="marca" value={product.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus  />
                   
                </div>

            
            
            </Dialog>


            <Dialog visible={saidaDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Saida de Produto" modal className="p-fluid" footer={saidatDialogFooter} onHide={hideDialog}>
                

                <div className="field">
                        <label htmlFor="senha" className="font-bold">
                        Tipo de Produto
                        </label>
                            <Dropdown disabled className="w-full md:w-14rem" id="tipo_producto"  options={tipoproducto} optionLabel="name" required autoFocus  value={product.tipo_producto} onChange={(e) => onInputChange(e, 'tipo_producto')} 
                            
                         />
                    </div>
             
                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                           Nome
                        </label>
                        <InputText disabled id="nome" value={product.nome} onChange={(e) => onInputChange(e, 'nome')} required  className={classNames({ 'p-invalid': submitted && !product.nome })} />
                       
                    </div>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                           Marca
                        </label>
                        <InputText disabled id="marca" value={product.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus />
                        
                    </div>
                  <div className="field">
                      
                    
                         <label htmlFor="quantidade" className="font-bold">
                         Quantidade atual
                      </label>
                        <InputText disabled type="number" id="status" value={product.status} onChange={(e) => onInputChange(e, 'status')}  equired   rows={2} cols={20} />
                     
                        
                    </div>

              
            
                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                         Saida:
                        </label>
                        <InputText type="number" id="saida"    onChange={(e) => onInputChange(e, 'saida')} required autoFocus />
                        {product.saida > product.status?
                        <small className="p-error">Não há sufuciente </small>
                        
                          :
                          
                          <small></small> }
                    </div>
    
                
                
                </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Tem certeza de que quer excluir o Item : <b>{product.nome}</b>?
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
        