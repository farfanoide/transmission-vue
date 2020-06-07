export default function CountryMask (address)
{
  return address.split('.').filter((e, i) => { if (i < 2) { return e }}).join('.') + '.0.0'
}
