import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent {
  /*Para converter um array de bytes em um arquivo .csv em Angular, você pode seguir os seguintes passos:

1, Converter Bytes para Blob: Primeiro, converta o array de bytes em um Blob. 
Um Blob é um objeto que representa um arquivo imutável de dados brutos.
2, Criar URL do Blob: Em seguida, crie uma URL para o Blob usando window.URL.createObjectURL(). 
Isso permite que você crie um URL temporário para o Blob.
3, Criar Elemento de Link: Crie um elemento <a> para fazer o download do arquivo.
4, Definir Atributos do Link: Defina o atributo href do link como o URL do Blob criado e o atributo download como o nome do arquivo .csv que você deseja.
5, Adicionar Link ao Documento: Adicione o elemento de link ao documento.
6, Simular o Clique no Link: Finalmente, dispare um evento de clique no elemento de link para iniciar o download do arquivo.
*/
  downloadCSV(arrayBuffer: Uint8Array, filename: string) {
    // Convertendo array de bytes em Blob
    const blob = new Blob([arrayBuffer], {  type: 'text/csv;charset=utf-8'  });

    // Criando URL para o Blob
    const url = window.URL.createObjectURL(blob);

    // Criando elemento de link
    const a = document.createElement('a');

    // Definindo atributos do link
    a.href = url;
    a.download = filename;

    // Adicionando o link ao documento
    document.body.appendChild(a);

    // Simulando o clique no link
    a.click();

    // Liberando recursos
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  // Método para simular o download
  simulateDownload() {
    // Simulação de retorno da API (array de bytes)
    const byteArrayString = "67;111;108;117;109;110;49;59;67;111;108;117;109;110;50;59;67;111;108;117;109;110;51;10;49;59;50;59;51;10;52;59;53;59;54";
    const byteArray = new Uint8Array(byteArrayString.split(';').map(byte => parseInt(byte)));
    

    const filename = 'dados.csv';

    // Chamando a função para fazer o download do arquivo CSV
    this.downloadCSV(byteArray, filename);
  }
}
