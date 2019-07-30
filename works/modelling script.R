library(perturb)
library(lmtest)

wages.Data.without.outliers <- read.csv("C:/Users/PATRICK AMOAH/Desktop/r data/wages.Data without outliers.csv")
View(wages.Data.without.outliers)


wages.Data<-wages.Data.without.outliers

wages.Data<-wages.Data.without.outliers[-101,]


 dummyMarr<-wages.Data$MARITAL.STATUS=="Married"
 dummyMarr<-1*dummyMarr
 dummyUnion<-wages.Data$UNION=="Member"
 dummyUnion<-1*dummyUnion
 dummySex<-wages.Data$SEX=="female"
 dummySex<-1*dummySex
 View(dummySex)
 Age<-wages.Data$AGE
Experience <-wages.Data$EXPERIENCE
 Education<-wages.Data$EDUCATION
 
 
 
 
 x<-cbind(dummySex,Education)
 
 
 cor(x,method="spearman")
 
 colldiag(x)
 
 
 model1 <- lm(WAGE ~ EDUCATION + SEX , data = wages.Data)
  
 
 summary(model1)
 
 
 boxplot(residuals(model1))
 
 bptest(model1)