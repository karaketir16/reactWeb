import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import {connect} from "react-redux"

class PreviewBase extends Component{

    constructor(props) {
        super(props);
        this.state = {

      };
      console.log("Title: ", this.state.title);
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
    render = () => {
        let title = this.props.title;
        let image = this.props.image;
        let text = this.props.text;
        let url  =  this.props.url;
        let date  =  this.props.date;
        let author = this.props.author;
    return (
        <div className="card" style={{"margin": "30px 0px"}}>
                <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Tarih {date ? date.toLocaleDateString("tr-TR", 
                            { year: 'numeric', month: 'long', day: 'numeric' } ) : "-"}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Yazar: {author ? author : "-"}</h6>
                <img style={{marginBottom:"20px"}} className="card-img-top" src={image} alt="Resim"/>
                <p style={{fontFamily: "Roboto", fontSize:"16px", color:"#000000"}} className="card-text">{text}</p>
                <div className="text-right"> 
                    <a href={url} className="btn btn-dark">Yaziyi Oku ≫</a>
                </div>
            </div>
        </div>

    )
};
        
}


const mapStateToProps = (state) =>
{
    return {};
};
const mapDispatchToProps = (dispatch) =>
{
    return {};
};

const Preview = withFirebase(PreviewBase);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Preview);