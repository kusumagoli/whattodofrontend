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
    height: '430px',
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

class ScheduleView extends React.Component {
    constructor(props){
        super(props);
        this.handleViewMore =this.handleViewMore.bind(this)
        this.handleRemove =this.handleRemove.bind(this)
        this.state = {
          data : [],
          id : "",
         
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

      handleRemove(event) {
        console.log("Hey reached")
       body = { sid : event.currentTarget.value }
      
       if(window.confirm('Delete the item?'))
       {
         console.log("deleting started" + body.sid)
         const url = "http://localhost:9000/schedule/delete"; 
         let headers = new Headers();
     
         headers.append('Content-Type', 'application/json');
         headers.append('Accept', 'application/json');
     
         headers.append('Access-Control-Allow-Origin', url);
         headers.append('Access-Control-Allow-Credentials', 'true');
     
         headers.append('DELETE','POST');
     
         fetch(url, {
            headers:headers,
            method: 'DELETE',
            body: JSON.stringify(body)
         })
         .then(response => response.json())
         .then(contents => { console.log("In fetch: "+ contents);
          window.location.reload(); 
                                 
      })
      .catch(()=> console.log("can't access" + url + "response. "))
     }
      } 
    

    componentDidMount(event) {
        body = {
            accessToken : localStorage.getItem("AccessToken"),
        }
 
        const url = "http://localhost:9000/schedule/token"; 
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('PUT','POST');
        console.log("can't access" + JSON.stringify(body))
        console.log("Hey hello ")
 
        fetch(url, {
           headers:headers,
           method: 'PUT',
           body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(contents => { console.log("In fetch: "+ contents);
                            this.setState({
                              data : contents,

                            })
                            console.log('test1 '+this.state)
          
                                
     })
     .catch(()=> console.log("can't access" + url + "response. "))
    }
    
render(){
    const { classes } = this.props;
   
    return (
      

      <React.Fragment>
      <CssBaseline/>
      <main>
        <div >
      <div style={{display: 'flex', flexFlow: 'horizantal', paddingBottom: '100px'}}>
     <Header history={this.props.history}/>
        
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
          <div className="row">
          
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
             <b> Scheduled Visits</b>
            </Typography>
          
            </div>
          </div>
      
        
        <div style= {{display: 'flex', flexWrap: 'wrap', margin: '5px'}}>
        {this.state.data.map((Schedule,index) => {
            return(

            <div>
              <div className={classNames( classes.cardGrid)}>
         
          <Grid container spacing={24}>
          
            {cards.map(card => (
              
              <Grid item key={card} sm={2} md={2}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={Schedule.attraction.imageUrls[0]}
                    title={Schedule.attraction.attr_Name}
                  />
                  <CardContent className={classes.cardContent}>
                    
                    <Typography gutterBottom variant="h6" component="h6">
                    <b>{Schedule.attraction.attr_Name}</b>
                    </Typography>
                    <Typography >
                <b>Location:</b>{Schedule.attraction.location}
              </Typography>
              <Typography >
                <b>Timings:</b>{Schedule.attraction.from_Timings} <b> - </b> {Schedule.attraction.upto_Timings}
              </Typography>
              <Typography >
                <b>Rating:</b>{Schedule.attraction.rating}
              </Typography>
              <Typography >
                <b>Scheduled Date :</b>{((Schedule.date).split('T'))[0]}
              </Typography>

                <div className="col md-4">
                <Button size="small" color="primary" className={classes.button} style={{float :"left"}} onClick = {this.handleRemove} value={Schedule.sid}>
                        Remove
                    </Button>
                   </div>
                <div className="col md-2">
                    <Button size="small" color="primary" className={classes.button} style={{float :"right"}} onClick = {this.handleViewMore} value={Schedule.attraction.aid}>
                        View More
                    </Button>
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
  
ScheduleView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleView);
