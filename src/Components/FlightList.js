import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash.isempty';
import moment from 'moment'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

export default function FlightList(props) {
  let check = 0
  const classes = useStyles();
  return (
    <div>
      {!isEmpty(props.flightList.Quotes) && props.flightList.Quotes.map(quote => {
        if (moment(quote.OutboundLeg.DepartureDate).format("YYYY-MM-DD") === props.date || props.withoutDate === true) {
          check++
          return <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Direct Flight: {quote.Direct ? "Yes" : "No"}
              </Typography>
              <Typography variant="h5" component="h2">
                DepartureDate: {moment(quote.OutboundLeg.DepartureDate).format("DD-MM-YYYY")}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Flight From: {props.flightList.Places && props.flightList.Places.map(places => {
                if (places.PlaceId === quote.OutboundLeg.OriginId)
                  return places.Name
              })}

              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Flight To:{props.flightList.Places && props.flightList.Places.map(places => {
                if (places.PlaceId === quote.OutboundLeg.DestinationId)
                  return places.Name
              })}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Carriers: {props.flightList.Carriers && props.flightList.Carriers.map(carrier => {
                return quote.OutboundLeg.CarrierIds.map(id => {
                  if (carrier.CarrierId === id)
                    return carrier.Name
                })
              })}
              </Typography>
              <Typography variant="body2" component="p">
                Ticket Price: ${quote.MinPrice}
                <br />
              </Typography>
            </CardContent>
          </Card>
        }
      })
      }
      {check === 0 || isEmpty(props.flightList.Quotes) ? <small style={{ color: "red" }}> No Flight Found. Try Changing date or Location</small> : ''}
    </div>
  )
}


