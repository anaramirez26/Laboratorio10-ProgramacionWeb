import bcrypt from 'bcrypt';

const hashP = async (passwd) => {
    return await bcrypt.hash(String(passwd), 10);
}

export default { hashP }