import { RouteComponentProps, useNavigate } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import { Fab, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons'

import React, { useEffect, useState } from 'react'
import { Property } from '../common/types';
import { getPropertiesList } from './home.api';
import { deleteProperty } from '../PropertyDetailsPage/details.api';


const useStyles = makeStyles({
  tableRow: {
    cursor: 'pointer'
  },
  fab: {
    position: 'fixed',
    bottom: '32px',
    right: '32px'
  }
})

interface ListOfPropertiesProps extends RouteComponentProps {

}

const ListOfProperties: React.FC<ListOfPropertiesProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState<Property[] | null>(null)

  useEffect(() => {
    const fetchPropertiesList = async () => {
      const propertiesList = await getPropertiesList()
      setProperties(propertiesList)
    }
    fetchPropertiesList()
  }, [])

  const onRowClick = (propertyId: string) => navigate(`properties/${propertyId}`)

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>, propertyId: string) => {
    event.stopPropagation();
    const listAfterDelete = await deleteProperty(propertyId);
    setProperties(listAfterDelete);
  }

    return (<>
      <Typography variant="h1">Properties (real estates)</Typography>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties && properties.map(property => (
            <TableRow className={classes.tableRow} hover key={property.id} onClick={() => onRowClick(property.id)}>
           
              <TableCell>
                {property.id}
              </TableCell>
              <TableCell>
                {property.name}
              </TableCell>
              <TableCell>
                {property.plan}
              </TableCell>
              <TableCell>
                {property.units}
              </TableCell>
              <TableCell>
                {property.city}
              </TableCell>
              <TableCell>
                {property.region}
              </TableCell>
              <TableCell>
                {property.manager}
              </TableCell>
              <TableCell>
              <IconButton onClick={(event) => onDelete(event, property.id)} aria-label="delete" color="primary">
                  <Delete />
              </IconButton>
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Fab onClick={() => navigate('/properties/new')} className={classes.fab} color="primary" aria-label="add">
        <Add />
      </Fab>
    </>);
}

export default ListOfProperties