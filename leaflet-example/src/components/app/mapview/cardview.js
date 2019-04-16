import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Header from '../headers';
import SideNav from './../sidebar/sidenav';
import SideNavBefore from './../sidebar/sidenavbefore';
import MapRender from '../../maprender/mapreder';
import Schedule from './schedule';


const styles = theme => ({
  
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    margin: '15px'
    
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const cards = [1];
var body;
let flag;

class CardView extends React.Component {
    constructor(props){
        super(props);
        this.handleViewMore =this.handleViewMore.bind(this)
        this.state = {
          data : [],
          id : ""
        }
      }


      handleViewMore(event) {

        this.setState({id:event.currentTarget.value}, () => {
        console.log(this.state.id)
    
        let id=this.state.id
        console.log(id);
        let path= `/view/`;
        this.props.history.push({
          pathname: path,
          state: {
            id : id
          }
       }) 
    
       console.log("sent city"+this.state.id)
          });
        
      }
    

    componentDidMount(event) {

      let city= this.props.location.state.city;
      flag= this.props.location.state.flag;
      console.log(this.props.location.state.city);
      console.log(city);

      let category= localStorage.getItem("Category");
      localStorage.removeItem("Category");
      console.log(category);

      if(category==undefined)
      { 
      body = {
        city: city,
      }
      console.log(body);
      console.log(body.city);
     
        const url = "http://localhost:9000/attractions/city"; 
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('PUT','POST');
 
        fetch(url, {
           headers:headers,
           method: 'PUT',
           body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(contents => { console.log("In fetch: "+ contents);
                            this.setState({
                              data : contents
                            })
                            console.log('test1 '+this.state)
          
                                
     })
     .catch(()=> console.log("can't access" + url + "response. "))
    }
    else
    {
      body = {
        city: city,
        category: category,
      }
      console.log(body);
      const url = "http://localhost:9000/attractions/category";
      let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('PUT','POST');
 
        fetch(url, {
           headers:headers,
           method: 'PUT',
           body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(contents => { console.log("In fetch: "+ contents);
                            this.setState({
                              data : contents
                            })
                            console.log('test1 '+this.state)
          
                                
     })
     .catch(()=> console.log("can't access" + url + "response. "))
    }
        
     
      }
    
render(){
    const { classes } = this.props;
   
    return (
      

      <React.Fragment>
      <CssBaseline/>
      <main>
        <div 
     >
      <div style={{display: 'flex', flexFlow: 'horizantal', paddingBottom: '100px'}}>
      {
                            ((localStorage.getItem("AccessToken") == null )?
                            <SideNavBefore history={this.props.history}/>:<SideNav history={this.props.history}/>)
      }
        
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
          <div className="row">
          
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
             <b> Attractions to Visit</b>
            </Typography>
            <MapRender data={this.state.data} history={this.props.history}/>
            </div>
          </div>
      
        
        <div style= {{display: 'flex', flexWrap: 'wrap', margin: '5px'}}>
        {this.state.data.map((Attractions,index) => {
            return(

            <div>
              <div className={classNames( classes.cardGrid)}>
         
          <Grid container spacing={24}>
          
            {cards.map(card => (
              
              <Grid item key={card} sm={2} md={2}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={Attractions.imageUrls[0]}
                    title={Attractions.attr_Name}
                  />
                  <CardContent className={classes.cardContent}>
                    
                    <Typography gutterBottom variant="h6" component="h6">
                    <b>{Attractions.attr_Name}</b>
                    </Typography>
                    <Typography >
                <b>Location:</b>{Attractions.location}
              </Typography>
              <Typography >
                <b>Timings:</b>{Attractions.from_Timings} <b> - </b> {Attractions.upto_Timings}
              </Typography>
              <Typography >
                <b>Rating:</b>{Attractions.rating}
              </Typography>

              <div className="row">
              {
                ((flag==1) ? 
                <div className="col md-4">
                   <Schedule aid={Attractions.aid} history={this.props.history}/>
                </div> :
                <div className="col md-4">
                </div>
                ) 

              }
                <div className="col md-2">
                    <Button size="small" color="primary" className={classes.button} style={{float :"right"}} onClick = {this.handleViewMore} value={Attractions.aid}>
                        View More
                    </Button>
                </div>
              </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        
        </div>
      
         )
        })}
        </div>
        </div>

      </div>


      
      </div>
       
        </main>
      

     
        </React.Fragment>

      
      );
    }
    
}
  
CardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardView);
