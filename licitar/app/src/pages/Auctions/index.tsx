import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auction } from '../../types/Auction';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export function Auctions() {
  const [auctions, setAuctions] = useState<Auction[] | null>(null);
  const [carregouAuctions, setCarregouAuctions] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await auth.getAuctions();
        setAuctions(response);
        setCarregouAuctions(true);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  const handleEntrarClick = (roomKey: string) => {
    navigate('/auctions/' + roomKey);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ padding: '1rem', borderRadius: '0.5rem', boxShadow: '2px 1px 11px -8px rgba(0,0,0,0.75)' }}
          >
            <Typography component="h1" variant="h4" align="center" color="text.primary" gutterBottom>
              Bem-vindo ao emocionante mundo das licitações!
            </Typography>
            <Typography align="justify" variant="h6" color="text.secondary" paragraph>
              Aqui, oferecemos a você a oportunidade de participar de leilões empolgantes e competir por itens exclusivos,
              raridades e tesouros especiais. Junte-se a nós e vivencie a emoção dos lances em busca de grandes descobertas.
              Não perca tempo, entre agora mesmo e comece a fazer seus lances!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {carregouAuctions === false ? (
              <Typography variant="body1">Carregando leilões...</Typography>
            ) : (
              <React.Fragment>
                {auctions &&
                  auctions.map((auction: Auction) => (
                    <Grid item key={auction.id} xs={12} sm={6} md={4}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ bgcolor: '#f5f5f5', p: 2, mb: 2 }}>
                            <Typography variant="h5" component="h2">
                              {auction.name}
                            </Typography>
                            <Typography>{auction.description}</Typography>
                          </Box>
                          <Box sx={{ bgcolor: '#e0e0e0', p: 2 }}>
                            <Typography variant="subtitle1">Valor mínimo: {auction.minimumValue}</Typography>
                            <Typography variant="subtitle1">Último lance: {auction.lastBidValue}</Typography>
                            <Typography variant="subtitle1">Início: {auction.startDate}</Typography>
                            <Typography variant="subtitle1">Fim: {auction.endDate}</Typography>
                          </Box>
                          <Box sx={{ bgcolor: '#d5f5e3', p: 2 }}>
                            <Typography variant="subtitle1">Produto:</Typography>
                            <Typography variant="subtitle2">Título: {auction.product.title}</Typography>
                            <Typography variant="subtitle2">Categoria: {auction.product.category}</Typography>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ background: 'rgb(25 118 210)' }}>
                          <Button size="small" sx={{ color: 'white', fontWeight: '700' }} onClick={() => handleEntrarClick(auction.roomKey)}>
                            Entrar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </React.Fragment>
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
