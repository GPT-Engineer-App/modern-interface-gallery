import { useState } from "react";
import { Container, VStack, Input, Button, SimpleGrid, Box, Image, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const toast = useToast();

  const fetchWebsiteData = (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: `Website Title for ${new URL(url).hostname}`,
          description: `Meta description or relevant content for ${url}`,
          addedDate: new Date().toLocaleDateString(),
        });
      }, 500);
    });
  };

  const handleAddUrl = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "URL cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const websiteData = await fetchWebsiteData(url);
    const newUrl = {
      id: Date.now(),
      link: url,
      image: `https://images.unsplash.com/photo-1617854818583-09e7f077a156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHwlMjQlN0J1cmwlN0R8ZW58MHx8fHwxNzE1NTQ0NTc4fDA&ixlib=rb-4.0.3&q=80&w=1080`,
      title: websiteData.title,
      description: websiteData.description,
      addedDate: websiteData.addedDate,
    };
    setUrls([newUrl, ...urls]);
    setUrl("");
    toast({
      title: "Added",
      description: "URL has been added successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteUrl = (id) => {
    setUrls(urls.filter((url) => url.id !== id));
    toast({
      title: "Deleted",
      description: "URL has been removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={4}>
        <Input placeholder="Enter URL here..." value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddUrl}>
          Add URL
        </Button>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
          {urls.map(({ id, link, image, title, description, addedDate }) => (
            <Box key={id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden" position="relative">
              <Image src={image} alt={`Preview of ${link}`} />
              <Text mt={2}>
                {title} - Added on {addedDate}
              </Text>
              <Text fontSize="sm">{description}</Text>
              <IconButton aria-label="Delete URL" icon={<FaTrash />} size="sm" colorScheme="red" position="absolute" top={2} right={2} onClick={() => handleDeleteUrl(id)} />
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
