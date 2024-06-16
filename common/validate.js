class Validate {
    name = (value) => {
        return /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ ]+$/.test(value)
    }

    phone = (value) => {
        return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(value)
    }

    email = (value) => {
        return /\S+@\S+\.\S+/.test(value)
    }

    notNull = (value) => {
        if (value === "")
        {
            return false
        }
        else
        {
            return true
        }
    }
}

const validate = new Validate();

export default validate;
