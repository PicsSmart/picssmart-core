import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, IconButton, Box } from '@mui/material';
import {Star, StarOutline, CalendarMonth, PhotoCamera, LocationOn, Description} from '@mui/icons-material';

const image = {
        id: '1',
        image: 'https://picsum.photos/200/300',
        title: 'Image_123.jpg',
        labels: ['Elephant', 'Landscape'],
        time: 'Tue, 13th Aug 2023 - 9.35 AM GMT+2',
        device: 'iPhone 12 Pro Max',
        resolution: '4032 x 3024',
        size: '3.2 MB',
        location: 'London, UK',
        description: 'This is a description of the imagedjejj wdnjindhjnd wdhqBDHBdjhc HDBHbewhdbWJ DbqdhbhQUJB'
}
const labels = image.labels.join(', ');

const ContentHeader = ()=>{
    const [fav, setFav] = React.useState(false);
    const handleFav = ()=>{
        setFav(!fav);
    }
    return (
        <Grid container>
            <Grid xs={10}>
                    <Typography variant="h5" component="div">
                        {image.title}
                    </Typography>
                    
                    <Typography key={image.id} variant="body2">
                        <Box sx={{fontStyle:'italic'}}>
                            {labels}
                        </Box>
                    </Typography>
            </Grid>
            <Grid xs={2} sx={{display:'flex', alignItems:'top', justifyContent:'right'}}>
                <IconButton aria-label="favourites" color="picsmart" onClick={handleFav}>
                    {fav?<Star/>:<StarOutline/>}
                </IconButton>           
            </Grid>       
        </Grid>
    )
}

const ContentBody = ()=>{ 
    return(
        <Grid container mt="1rem" rowSpacing={0.5}>
            <Grid item xs={1} sx={{display:'flex', alignItems:'top', justifyContent:'center'}}>
                <CalendarMonth sx={{fontSize:17}} color="secondary"/>
            </Grid>
            <Grid item xs={11} sx={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                <Typography key={image.id} variant="body2"  color="text.secondary">
                    {image.time}
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{display:'flex', alignItems:'top', justifyContent:'center'}}>
                <PhotoCamera sx={{fontSize:17}} color="secondary"/>
            </Grid>
            <Grid item xs={11} sx={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                <Typography key={image.id} variant="body2"  color="text.secondary">
                    {image.device},{image.resolution},{image.size}
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{display:'flex', alignItems:'top', justifyContent:'center'}}>
                <LocationOn sx={{fontSize:17}} color="secondary"/>
            </Grid>
            <Grid item xs={11} sx={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                <Typography key={image.id} variant="body2"  color="text.secondary">
                    {image.location}
                </Typography>
            </Grid>
            <Grid item xs={1} sx={{display:'flex', alignItems:'top', justifyContent:'center'}}>
                <Description sx={{fontSize:17}} color="secondary"/>
            </Grid>
            <Grid item xs={11} sx={{display:'flex', alignItems:'center', justifyContent:'left'}}>
                <Typography key={image.id} variant="body2"  color="text.secondary">
                    {image.description.slice(0, 50)}{image.description.length>50?'...':''}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default function ActionAreaCard() {
  return (
        <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            image={image.image}
            alt="image"
            height="140"
            />
            <CardContent m='4'>
                <ContentHeader/>
                <ContentBody/>
            </CardContent>
        </CardActionArea>
        </Card>
  );
}