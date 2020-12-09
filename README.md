# beer-calculator

Beer calculator is a set of utility tools made to facilitate beer design.

### Functionalities

- Alcohol By Volume calculator
- Dillution and Boill Off calculator
- Malts management, SRM/EBC color calculator
- Mash (efficiency, mash water, sparge water, estimated density)
- Hops management, IBU calculator
- Import/Export recipe

## development

```bash
cp .env.example .env

make install dev
```

## production

```bash
cp .env.example .env

sed -i 's/NODE_ENV=development/NODE_ENV=production/g' .env

make install build prod
```
