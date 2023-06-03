import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function SelectionPanel({ selPlaces, setSelPlaces }) {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: place => {
      if (!place) {
        return;
      }
      ref.current.value = '';
      setSelPlaces(prev => {
        if (prev && prev.length > 0 && prev.find(p => p.name === place.name)) {
          return prev;
        }

        return prev.concat({ listNum: prev.length + 1, ...place });
      });
    },
    options: {
      types: '',
      fields: [
        'name',
        'place_id',
        'rating',
        'reviews',
        'formatted_address',
        'geometry.location',
        'icon',
        'types',
      ],
    },
  });

  return (
    <Box w="full">
      <Heading mb="8">Add a query point</Heading>

      <Box display="flex" alignItems="center" columnGap="4">
        <Text fontSize="lg">Location:</Text>
        <Input placeholder="Enter a location" size="md" ref={ref} mr="6" />
      </Box>

      <Box my="12">
        {selPlaces && selPlaces.length > 0 ? (
          <Box>
            <Heading>Your Current Selection:</Heading>
            <Box>
              {/* {
    "formatted_address": "1 Jurong West Central 2, Singapore 648886",
    "geometry": {
        "location": {
            "lat": 1.3397443,
            "lng": 103.7067297
        }
    },
    "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    "name": "Jurong Point",
    "place_id": "ChIJa9YM2-wP2jERmOUStQKyiS0",
    "rating": 4.4,
    "reviews": [
        {
            "author_name": "JC Chew",
            "author_url": "https://www.google.com/maps/contrib/105832216832261458012/reviews",
            "language": "en",
            "profile_photo_url": "https://lh3.googleusercontent.com/a/AAcHTtcBKF3k8fUk4Tan86XLuCJX-9NDhTR0L3BgKNEo=s128-c0x00000000-cc-rp-mo-ba4",
            "rating": 5,
            "relative_time_description": "a year ago",
            "text": "The kopitiam was renovated recently. Colourful neon banners really eye catching. Variety of food offered here now added in some new popular names. No bad at all!",
            "time": 1642077868
        },
        {
            "author_name": "Vienna",
            "author_url": "https://www.google.com/maps/contrib/103415808392827589559/reviews",
            "language": "en",
            "profile_photo_url": "https://lh3.googleusercontent.com/a-/AD_cMMSpmlz4pBj5fTrEJzVe2mOgptAma6JUVGHtaeCsNfo=s128-c0x00000000-cc-rp-mo-ba6",
            "rating": 5,
            "relative_time_description": "a year ago",
            "text": "Great mall with sooooo many dining places. Definitely can satisfy the foodies. The entire mall is like a walking street with sunshine coming from the celling. There’s a Japanese street of lots of Japanese cuisine and a HK street,  a Malaysian food court.",
            "time": 1653202792
        },
    ],
    "types": [
        "shopping_mall",
        "point_of_interest",
        "establishment"
    ],
    "html_attributions": [],
    "listNum": 1,
} */}
              {selPlaces.map((x, index) => (
                <Box key={index}>
                  <Box display="flex" alignItems="center" columnGap="3">
                    <Text fontSize="md">
                      {x.listNum}. {x.name}
                    </Text>
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={() =>
                        setSelPlaces(prev => {
                          var temp = [];
                          for (var i = 0; i < prev.length; i++) {
                            if (prev[i].name === x.name) {
                              continue;
                            }
                            prev[i].listNum = temp.length + 1;
                            temp.push(prev[i]);
                          }
                          return temp;
                        })
                      }
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box w="full" textAlign="center" my="16">
              <Button w="80%" colorScheme="whatsapp" variant="solid">
                Search by example
              </Button>
            </Box>
          </Box>
        ) : (
          <Text fontSize="md">No selection yet</Text>
        )}
      </Box>
    </Box>
  );
}
