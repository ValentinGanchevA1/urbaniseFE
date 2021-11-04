import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps, useNavigate } from '@reach/router';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { Property } from '../common/types';
import { createProperty, deleteProperty, getProperty, updateProperty } from './details.api';

interface PropertyDetailsPageProps extends RouteComponentProps {
  propertyId?: string;
}

const useStyles = makeStyles({
  spacing: {
    marginBottom: '16px'
  },
  error: {
    color: 'red',
    fontSize: '20px',
    fontWeight: 'bold'
  }
})

const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({propertyId}) => {
  const classes = useStyles()
  const navigate = useNavigate();


  const [error, setError] = useState<string | null>(null)
  const [property, setProperty] = useState<Property | null>(null)

  useEffect(() => {
    if(!propertyId) {
      return;
    }

    getProperty(propertyId).then(property => setProperty(property)).catch(err => {
        setError(err.response.data.error)
    })

  }, [propertyId])

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!property) {
      return;
    }
    // check whether to update or create new
    if(propertyId) {
      await updateProperty(property)
     
    } else {
      await createProperty(property) 
    }
    navigate('/')
  }

  const onDelete = async () => {
    if(!propertyId) {
      return;
    }
    await deleteProperty(propertyId);
    navigate('/')
  }

  const onFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProperty(prevValue => {
      if(prevValue) {
        return {
          ...prevValue,
          [e.target.name]: e.target.value
        } as Property
      } else {
        return {
          [e.target.name]: e.target.value
        } as unknown as Property
      }
    })
    console.log(e.target.value)
    console.log(e.target.name)
  }

    return (<div>
      <Typography variant="h1">{property ? property.name : 'New property'}</Typography>
      <form onSubmit={onFormSubmit}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <TextField onChange={onFormValueChange} className={classes.spacing} type="number" name="id" value={property?.id || ''} label="Id" placeholder="Id"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} name="name" value={property?.name || ''} label="Name" placeholder="Name"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} name="plan" value={property?.plan || ''} label="Plan number" placeholder="Plan Number"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} type="number" name="units" value={property?.units || ''} label="Unit count" placeholder="Units"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} name="city" value={property?.city || ''} label="City" placeholder="City"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} type="number" name="region" value={property?.region || ''} label="Region" placeholder="Region"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} type="number" name="manager" value={property?.manager || ''} label="Manager" placeholder="Manager"/>
          <Button className={classes.spacing} type="submit" variant="contained" color="primary">Submit</Button>
          <Button disabled={!propertyId} variant="outlined" color="secondary" onClick={onDelete}>Delete</Button>
        </Box>
      </form>
      {error && <p className={classes.error}>{error}</p>}
    </div>);
}

export default PropertyDetailsPage