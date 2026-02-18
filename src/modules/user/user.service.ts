import { prisma } from "../../lib/prisma";

const getme = async (userId : string) => {
  const result = await prisma.user.findUnique({
    where : {
      id : userId
    }
  })
  return result;
};

export const userService = {
  getme,
};
