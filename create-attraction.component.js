import React, { Component } from 'react';
import axios from 'axios';
import '../index.css';
import { BACKEND_URL } from '../config';

export default class CreateAttraction extends Component {
    constructor(props) {  
        super(props); 
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeImageUrl = this.onChangeImageUrl.bind(this);

        this.onSubmit = this.onSubmit.bind(this);    

        this.state = {  
          name: '',  
          description: '',  
          address: '',  
          zipcode: '',  
          website: '',
          imageUrl: '',

          attractions: [],
        }  
      }

      componentDidMount() {
            axios.get(BACKEND_URL + 'attractions/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        attractions: response.data.map(names => names.name),
                    })
                }
            })
      }
      
      onChangeName(e) {  
        this.setState({  
          name: e.target.value  
        });  
      }onChangeDescription(e) {  
        this.setState({  
          description: e.target.value  
        });  
      }onChangeAddress(e) {  
        this.setState({  
          address: e.target.value  
        });  
      }onChangeZipcode(e) {  
        this.setState({  
          zipcode: e.target.value  
        });  
      }onChangeWebsite(e) {  
        this.setState({  
          website: e.target.value  
        });
      }
      onChangeImageUrl(e) {  
        this.setState({  
          imageUrl: e.target.value  
        });
      }
      
      onSubmit(e) {
        e.preventDefault();
        const attraction = {
          name: this.state.name,
          description: this.state.description,
          address: this.state.address,
          zipcode: parseInt(this.state.zipcode, 10),
          website: this.state.website,
          imageUrl: this.state.imageUrl,
        };
      console.log(attraction);

      try {
      axios.post(BACKEND_URL + 'attractions/add', attraction)
      .then(res => console.log(res.data));

      //bad bad line dont use
      // window.location = '/blog';
      this.props.history.push('/blog')
      }
      catch (err) {
          console.log(err);
      }
      }

    render() {
        return (
            <div className="submitAttractionContainer">
            <div className="testContainer2">
            <h3 className="attractionHeader">Add a new attraction!</h3>
            <p className="addAttractionText">Make sure the zipcode is 5 numbers and the website has www. at the beginning.</p>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="testContainer"> 
                <input  type="text"
                    required
                    className="form-control formtextAttraction my-2"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    placeholder="Name"
                    />
                <input  type="text"
                    required
                    className="form-control formtextAttraction my-2"
                    value={this.state.Description}
                    onChange={this.onChangeWebsite}
                    placeholder="Website"
                    />
              </div>
              <div className="testContainer">
                <input 
                    type="text" 
                    className="form-control formtextAttraction my-2"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    placeholder="Address"
                    />
                <input 
                    type="number" 
                    className="form-control formtextAttraction my-2"
                    value={this.state.zipcode}
                    onChange={this.onChangeZipcode}
                    placeholder="Zipcode"
                    />
              </div>
              <div className="testContainer ">
                <input 
                    type="text" 
                    className="form-control formtextAttraction my-2"
                    value={this.state.imageUrl}
                    onChange={this.onChangeImageUrl}
                    placeholder="ImageUrl"
                    />
              </div>
              <div className="testContainer my-0">
                <textarea
                    type="text" 
                    className="form-control formtextAttractionBig my-2"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    placeholder="Tell us more about this place"
                    rows="5"
                    />
              </div>
  
              <div className="text-center mx-3">
                <input type="submit" value="Submit" className="w-50 btn attractionSubmit" />
              </div>
            </form>
            <br/>
            <br/>
          </div>
        )
    }
}
