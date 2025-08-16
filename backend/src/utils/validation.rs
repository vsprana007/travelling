use validator::ValidationError;

#[allow(dead_code)]
pub fn validate_password_strength(password: &str) -> Result<(), ValidationError> {
    if password.len() < 8 {
        return Err(ValidationError::new("Password must be at least 8 characters long"));
    }
    
    let has_uppercase = password.chars().any(|c| c.is_uppercase());
    let has_lowercase = password.chars().any(|c| c.is_lowercase());
    let has_digit = password.chars().any(|c| c.is_digit(10));
    
    if !has_uppercase || !has_lowercase || !has_digit {
        return Err(ValidationError::new("Password must contain uppercase, lowercase, and digit"));
    }
    
    Ok(())
}

#[allow(dead_code)]
pub fn validate_phone_number(phone: &str) -> Result<(), ValidationError> {
    let cleaned = phone.replace(&[' ', '-', '(', ')', '+'][..], "");
    
    if cleaned.len() < 10 || cleaned.len() > 15 {
        return Err(ValidationError::new("Invalid phone number length"));
    }
    
    if !cleaned.chars().all(|c| c.is_digit(10)) {
        return Err(ValidationError::new("Phone number must contain only digits"));
    }
    
    Ok(())
}
