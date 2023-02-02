import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduto, produtos } from '../produtos';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {

  produtos: IProduto[] | undefined;

  constructor(
    private produtosService: ProdutosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const produtos = this.produtosService.getAll();

    this.activatedRoute.queryParamMap.subscribe(params => {
      const descricao = params.get("descricao")?.toLocaleLowerCase();
      
      if (descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLocaleLowerCase().includes(descricao));
        return;
      }

      this.produtos = produtos;
    })
  }
}
