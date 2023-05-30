import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CategoriaDados, CategoriaService } from 'src/app/services/categoria.service';
import { FornecedorDados, FornecedorService } from 'src/app/services/fornecedor.service';
import { ProdutoDados, ProdutoService } from 'src/app/services/produto.service';
import { FormControl, FormBuilder, FormGroup, NgForm} from '@angular/forms';
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.page.html',
  styleUrls: ['./criar-produto.page.scss'],
})
export class CriarProdutoPage implements OnInit {
  categorias: CategoriaDados[] = [];
  fornecedores: FornecedorDados[] = [];
  dadosForm!: FormGroup;

  enviado = false;
  
  constructor(
    private toastCtrl:ToastController,
    private alertCtrl: AlertController,
    private categoriaService:CategoriaService,
    private fornecedorService:FornecedorService,
    private modalCtrl: ModalController,
    public produtoService: ProdutoService) { }

  ngOnInit() {
    console.log()
    this.carregarCategorias()
    this.carregarFornecedores()

    this.dadosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      estoque: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      fornecedor: new FormControl('', Validators.required)
    })
  }

  enviar(){
    if(this.dadosForm.valid){
      this.registrarProduto()
      this.mostrarToast()
      this.fechar()
    } else {
      this.mostrarAlerta()
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: 'Preencha todos os campos.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarToast() {
    const toast = await this.toastCtrl.create({
      message: `Um novo produto foi registrado com sucesso`,
      duration: 1000,
      position: 'bottom',
    });
    await toast.present();
  }

  fechar() {
    this.modalCtrl.dismiss()
  }

  carregarCategorias(){
    this.categoriaService.listarCategorias().subscribe((res) => {
      this.categorias.push(...res.dados);
      console.log(this.categorias);
    })
  }

  carregarFornecedores(){
    this.fornecedorService.listarFornecedores().subscribe((res) => {
      this.fornecedores.push(...res.dados);
    })
  }

  registrarProduto(){
    const dadosProduto: any = {
      'Nome': this.dadosForm.value.nome,
      'Preco': this.dadosForm.value.preco,
      'QtdEstoque': this.dadosForm.value.estoque,
      'FkFornecedor': this.dadosForm.value.fornecedor,
      'FkUsuario': 'Placeholder',
      'FkCategoria': this.dadosForm.value.categoria,
    }

    this.produtoService.inserirProduto(dadosProduto)
  }
}
