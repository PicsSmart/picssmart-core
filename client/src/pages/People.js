import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PeopleCard from 'components/PeopleCard';

import { useNavigate } from 'react-router-dom';

const People = () => {

  const navigate = useNavigate();
  const onClickHandler = (id) => {
    navigate(`/people/${id}`);
  }

  // dummy data
  const nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
    'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
    'Mine','Your','Worst','Enemy','Hostile','Force','Video',
    'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
    'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script','Writer','Near','Close','Open','Cube','Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
];

  const peopleItems = [
    // generate 15 people
    ...Array.from({ length: 15 }, () => ({
      id: Math.floor(Math.random() * 1000),
      face: 'https://picsum.photos/200',
      name: nameList[Math.floor(Math.random() * nameList.length)] + ' ' + nameList[Math.floor(Math.random() * nameList.length)],
      photoCount: Math.floor(Math.random() * 100),
      favouriteCount: Math.floor(Math.random() * 100),
    })),
  ];

  return (
    <div>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {peopleItems && peopleItems.length != 0 ? (
          peopleItems.map((row) => (
            <Grid item xs={6} sm={3} md={2} key={row.id} onClick={() => onClickHandler(row.id)}>
              <PeopleCard data={row} />
            </Grid>
          ))
        ) : (
          <div>No results found</div>
        )}

      </Grid>
    </Box>
    </div>
  );
}

export default People;
