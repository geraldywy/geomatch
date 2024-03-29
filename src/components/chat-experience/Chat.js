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
  Flex,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { BiUser, RiSendPlaneFill } from 'react-icons/all';
import { fireChatReq } from '../../api/api';
import botAvatarPicUrl from './me.jpg';
import workingGif from './working.gif';
import ReactLoading from 'react-loading';

export default function Chat({ inView, setResults }) {
  const [avatarBadgeColor, setAvatarBadgeColor] = useState('tomato');
  const [chatRecords, setChatRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [ranFlag, setRanFlag] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1);

  const openingMessage =
    'Yellow! I am Gerald Bot (super creative I know), tell me what kind of spatial example you are looking for. I am here to help you out! 🤗';

  useEffect(() => {
    if (!loaded || ranFlag) {
      return;
    }
    setRanFlag(true);
    if (!timeLeft) {
      setChatRecords(prev =>
        prev.concat({
          from: 'bot',
          message: openingMessage,
        })
      );
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
      setChatRecords(prev =>
        prev.concat({
          from: 'bot',
          message: openingMessage,
        })
      );
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
      <Box mx="auto" w="60vw" p="5" borderWidth="1px" borderRadius="lg">
        <ChatHeader avatarBadgeColor={avatarBadgeColor} />
        <ChatBox
          chatRecords={chatRecords}
          setChatRecords={setChatRecords}
          setResults={setResults}
        />
      </Box>
    </Box>
  );
}

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

const ChatBox = ({ chatRecords, setChatRecords, setResults }) => {
  const [message, setMessage] = useState('');
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const [chatId, setChatId] = useState('');
  const [modelToUse, setModelToUse] = useState(0);
  const [promptToUse, setPromptToUse] = useState(0);
  const [prependPrevMsg, setPrependPrevMsg] = useState(false);

  const submitUserMessage = () => {
    if (message === '' || isLoadingResult) {
      return;
    }
    setChatRecords(prev => prev.concat({ from: 'user', message }));
    fireChatReq(
      message,
      setChatRecords,
      setIsLoadingResult,
      chatId,
      setChatId,
      modelToUse,
      setModelToUse,
      promptToUse,
      setPromptToUse,
      prependPrevMsg,
      setPrependPrevMsg,
      setResults
    );

    setMessage('');
  };

  const { colorMode } = useColorMode();

  return (
    <Flex
      direction="column"
      pt="3"
      pb="5"
      px="5"
      bgColor={colorMode === 'dark' ? '#040D12' : '#F5F5F5'}
      mt="3"
      borderRadius="lg"
      height="60vh"
    >
      <Box flex="1" overflowY="scroll">
        <ChatMessages chatRecords={chatRecords} />
      </Box>

      <Box mt="3">
        {isLoadingResult && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my="5px"
            columnGap="2"
          >
            <Text>Gerald Bot is typing</Text>
            <ReactLoading
              type="bubbles"
              color="#ffffff"
              height="18px"
              width="20px"
            />
          </Box>
        )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          columnGap="7"
        >
          <Box
            ml="5vw"
            w="80vw"
            backgroundColor={colorMode === 'light' ? '#FFFFFF' : ''}
          >
            <Textarea
              variant="outline"
              borderColor="whiteAlpha.600"
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submitUserMessage();
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
            onClick={submitUserMessage}
            isDisabled={message === '' || isLoadingResult}
          />
        </Box>
      </Box>
    </Flex>
  );
};

const ChatMessages = ({ chatRecords }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatRecords]);

  return (
    <Box>
      {chatRecords.map((record, i) => (
        <IndividualChatMessage key={i} record={record} />
      ))}
      <Box ref={messagesEndRef} />
    </Box>
  );
};

const IndividualChatMessage = ({ record }) => {
  const isBot = record.from.toLowerCase() === 'bot';
  const { colorMode } = useColorMode();

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
          <Box
            maxW="70%"
            mx="5"
            bgColor={colorMode === 'dark' ? '#1B262C' : '#EEEDED'}
            p="4"
            borderRadius="xl"
          >
            {record.message === 'processing GIF' ? (
              <Image src={workingGif} alt={record.message} />
            ) : (
              <Text fontSize="sm">{record.message}</Text>
            )}
          </Box>
        </Box>
      </Box>
    </FadeIn>
  );
};
