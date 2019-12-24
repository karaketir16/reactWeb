import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container';

class Preview extends Component{

    constructor() 
    {
      super();
      this.state = {
        newTodo: "",
        todos: [],
        test: [<b>deneme</b>, <b>deneme</b>]
      };
    };

// style={{"font-size": "22px", "font-family": "Roboto", "color":""}}
    // <Container style={{"margin-bottom": "30px", "padding": "20px"}}>
    //         <h1>
    //             <a className="badge badge-light"
    //             href="https://www.izdiham.com/ufuk-akbalin-sagcilik-siirleri-izdihamdan-cikti/" title="Ufuk Akbal’ın Sağcılık Şiirleri İzdiham’dan Çıktı">
    //                 Ufuk Akbal’ın Sağcılık Şiirleri İzdiham’dan Çıktı
    //             </a>
    //         </h1>
    //         <div class="post-info">
    //             <span class="thetime updated">Tarih <span itemprop="datePublished">24 Aralık 2019</span></span>
    //         </div>

    //         <a href="https://www.izdiham.com/ufuk-akbalin-sagcilik-siirleri-izdihamdan-cikti/" title="Ufuk Akbal’ın Sağcılık Şiirleri İzdiham’dan Çıktı" rel="nofollow" id="featured-thumbnail">
    //             <div class="featured-thumbnail">
    //                 <img width="770" height="360" src="https://i1.wp.com/www.izdiham.com/wp-content/uploads/2019/12/sagcilik-siirleri.png?resize=770%2C360&amp;ssl=1" class="attachment-featuredfull size-featuredfull wp-post-image" alt="" title="" itemprop="image"/>                       
    //         </div> 
    //         </a>
    //         <div class="front-view-content">
    //         1984 İstanbul doğumlu, sosyolog Ufuk Akbal’ın ilk şiir kitabı Sağcılık Şiirleri İzdiham’dan yayınlandı. 2010 kuşağının en önemli şairlerinden olan Ufuk Akbal, şiirlerinde ustaca kullandığı ironiyle yayınladığı her şiirden sonra ses getirmiş bir şair. Edebiyat yolculuğunda birçok edebiyat dergisinin mutfağında yer alan Ufuk Akbal’ın bugüne kadar yer aldığı dergiler şunlar: Şiirleri;&nbsp;…	    </div>
    //         <div class="article_footer">    
    //         <div class="readMore">
    //         <a href="https://www.izdiham.com/ufuk-akbalin-sagcilik-siirleri-izdihamdan-cikti/" title="Ufuk Akbal’ın Sağcılık Şiirleri İzdiham’dan Çıktı" rel="nofollow">
    //         Devamı <i class="fa fa-angle-double-right"></i>
    //         </a>
    //         </div>
    //         </div>              
    // </Container>
    render = () => 
    (
        <div class="card" style={{"margin": "30px 0px"}}>
            <div class="card-body">
                <h5 class="card-title">Nam si amitti vita beata potest, beata esse non potest</h5>
                <h6 class="card-subtitle mb-2 text-muted">Tarih 24 Aralık 2019</h6>
                <img class="card-img-top" src="https://via.placeholder.com/1920x1080" alt="Card cap"/>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Aliter enim explicari, quod quaeritur, non potest. Quid enim est a Chrysippo 
                praetermissum in Stoicis? Ex ea difficultate illae fallaciloquae, ut ait Accius,
                 malitiae natae sunt. Estne, quaeso, inquam, sitienti in bibendo voluptas? 
                 Quam tu ponis in verbis, ego positam in re putabam. Duo Reges: constructio 
                 interrete. Tum Torquatus: Prorsus, inquit, assentior;</p>
                <div className="text-right"> 
                    <a href="#link" class="btn btn-dark">Devamı ≫</a>
                </div>
            </div>
        </div>

    );
        
}

export default Preview;


