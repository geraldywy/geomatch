import {
  Avatar,
  AvatarBadge,
  Box,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  Textarea,
  useStatStyles,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { AiOutlineUser, BiUser, RiSendPlaneFill } from 'react-icons/all';

export default function Chat({ inView }) {
  const [avatarBadgeColor, setAvatarBadgeColor] = useState('tomato');
  const [chatRecord, setChatRecord] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [ranFlag, setRanFlag] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);

  const openingMessage =
    'Yellow! I am Gerald Bot (super creative I know), tell me what kind of spatial example you are looking for. I am here to help you out! 🤗';

  useEffect(() => {
    if (!loaded) {
      return;
    }
    setRanFlag(true);
    if (!timeLeft) {
      setChatRecord([
        {
          from: 'bot',
          message: openingMessage,
        },
      ]);
      setAvatarBadgeColor('green.500');
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [loaded]);

  useEffect(() => {
    if (loaded || !inView) {
      return;
    }
    setLoaded(true);
  }, [loaded, inView]);

  useEffect(() => {
    if (!loaded || !ranFlag) {
      return;
    }

    if (!timeLeft) {
      setChatRecord([
        {
          from: 'bot',
          message: openingMessage,
        },
      ]);
      setAvatarBadgeColor('green.500');
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <Box>
      <Box mx="auto" w="45%" p="5" borderWidth="1px" borderRadius="lg">
        <ChatHeader avatarBadgeColor={avatarBadgeColor} />
        <ChatBox chatRecord={chatRecord} setChatRecord={setChatRecord} />
      </Box>
    </Box>
  );
}

const botAvatarPicUrl =
  'https://www.dropbox.com/scl/fi/zpp0t7oizwglg7n6vm8rn/Photo-29-7-23-17-43-41-1-edited-1.jpg?rlkey=3zaomj4pk8xry3uod3ar73hsw&raw=1';

const ChatHeader = ({ avatarBadgeColor }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      columnGap="5"
      borderColor="teal"
      p="5"
      borderWidth="1px"
      borderRadius="lg"
    >
      <Avatar name="Gerald-Bot" src={botAvatarPicUrl}>
        <AvatarBadge boxSize="1em" bg={avatarBadgeColor} />
      </Avatar>

      <Box>
        <Text fontSize="lg">Gerald Bot</Text>
        <Text as="i">A bot with an uncanny resemblance to Gerald.</Text>
      </Box>
    </Box>
  );
};

const ChatBox = ({ chatRecord, setChatRecord }) => {
  const [message, setMessage] = useState('');
  return (
    <Box
      pt="3"
      pb="8"
      px="5"
      bgColor="#040D12"
      mt="3"
      borderRadius="lg"
      height="60vh"
      overflow="auto"
    >
      <Box h="100%" position="relative">
        {chatRecord.map((record, i) => (
          <IndividualChatMessage key={i} record={record} />
        ))}

        <Box position="absolute" bottom="0" w="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            columnGap="7"
          >
            <Box w="80%">
              <Textarea
                variant="outline"
                borderColor="whiteAlpha.600"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (message === '') {
                      return;
                    }
                    setChatRecord(prev =>
                      prev.concat({ from: 'user', message })
                    );
                    setMessage('');
                  }
                }}
                onChange={e => setMessage(e.target.value)}
                value={message}
              />
            </Box>
            <IconButton
              mr="2"
              colorScheme="telegram"
              aria-label="Send message"
              size="lg"
              isRound="true"
              variant="outline"
              icon={<RiSendPlaneFill />}
              onClick={() => {
                if (message === '') {
                  return;
                }
                setChatRecord(prev => prev.concat({ from: 'user', message }));
                setMessage('');
              }}
              isDisabled={message === ''}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const IndividualChatMessage = ({ record }) => {
  const isBot = record.from === 'bot';
  return (
    <FadeIn>
      <Box my="5">
        <Box
          w="100%"
          display="flex"
          justifyContent={isBot ? 'start' : 'end'}
          flexDirection={isBot ? 'row' : 'row-reverse'}
        >
          <Avatar
            src={isBot ? botAvatarPicUrl : 'default'}
            bg="teal.500"
            icon={<BiUser fontSize="1.5rem" />}
          />
          <Box maxW="70%" mx="5" bgColor="#1B262C" p="4" borderRadius="xl">
            <Text fontSize="sm">{record.message}</Text>
          </Box>
        </Box>
      </Box>
    </FadeIn>
  );
};
