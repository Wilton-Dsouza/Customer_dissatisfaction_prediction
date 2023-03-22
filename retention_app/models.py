from django.db import models
import pandas as pd
import matplotlib.pyplot as plt
# Create your models here.
import seaborn as sns
from django.shortcuts import render,redirect
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.forms import AuthenticationForm
import pickle
import json
from django.http import HttpResponse, JsonResponse, Http404
from django.core.files.storage import FileSystemStorage
from sklearn.model_selection import train_test_split, cross_val_score, cross_val_predict
from sklearn.metrics import accuracy_score
import os
import joblib

ldaButton = True
DTbutton = True
svmButton = True
hostmodelstatus = False

def home(request):
    global ldaButton
    global DTbutton
    global svmButton
    ldaButton = True
    DTbutton = True
    svmButton = True
    return  render(request,'index.html')

def upload(request):
    global X,y,filename
    global filenametextdisp
    global filenamefinal
    try:
        if request.method == 'POST':
            uploaded_file = request.FILES['dataUpload']
            filenametextdisp = uploaded_file.name
            for root, dir, files in os.walk('./Final_Model_pickle/'):
                picklefile = uploaded_file.name
                picklefile = picklefile.replace('.csv','')
                picklefile = picklefile +'_model.pkl'
                if picklefile in files:
                    valfileerror = False
                    fileuploadedstatus ={
                        'filerror': valfileerror,
                        'valfilename': filenametextdisp,
                        'picklefile': picklefile
                    }   
                    return render(request,'index.html',fileuploadedstatus) 
            fs = FileSystemStorage()
            fs.save(uploaded_file.name,uploaded_file)
            filename = {
                'filenametext': uploaded_file.name
            }
            df = pd.read_csv('./Saved_Dataset/' + uploaded_file.name)
            validation_list = ['customer_id','country', 'tenure', 'Product1','Product2', 'Product3','active_member', 'Customer feedback Ratings', 'churn']
            valiation_list_upload = df.columns.values.tolist()
            for i,j in zip(validation_list,valiation_list_upload):
                if i == j:
                    print("\033[32mValidation for column header name {0} is passed\033[0m".format(i))
                else:
                    print("\033[31mValidation for column header name {0} is failed\033[0m".format(i))
                    valstatus = False
                    columnfailure = i
                    filenamestatus ={
                        'valstatus': valstatus,
                        'columnfailure': columnfailure 
                    }
                    os.remove("./Saved_Dataset/" + uploaded_file.name)
                    return render(request,'index.html',filenamestatus)
                
            if set(df['country'].unique()).issubset(['Germany','France','Spain']):
                print("\033[32mValidation for country values check is passed\033[0m")
            else:
                countryvaluecheck = True
                countryfilevalue = {
                    'countryvaluecheck' : countryvaluecheck
                }
                print("\033[31mValidation for country check is failed. Other values than required values are included\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',countryfilevalue) 
            
            if set(df['Product1'].unique()).issubset([0,1]):
                print("\033[32mValidation for Product1 values check is passed\033[0m")
            else:
                product1valuecheck = True
                product1filevalue = {
                    'product1valuecheck' : product1valuecheck
                }
                print("\033[31mValidation for Product 1 check is failed. Other values than 0 and 1\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',product1filevalue)
            
            if set(df['Product2'].unique()).issubset([0,1]):
                print("\033[32mValidation for Product2 values check is passed\033[0m")
            else:
                product2valuecheck = True
                product2filevalue = {
                    'product2valuecheck' : product2valuecheck
                }
                print("\033[31mValidation for Product 2 check is failed. Other values than 0 and 1\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',product2filevalue)
            
            if set(df['Product3'].unique()).issubset([0,1]):
                print("\033[32mValidation for Product3 values check is passed\033[0m")
            else:
                product3valuecheck = True
                product3filevalue = {
                    'product3valuecheck' : product3valuecheck
                }
                print("\033[31mValidation for Product 3 check is failed. Other values than 0 and 1\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',product3filevalue)
            
            if set(df['active_member'].unique()).issubset([0,1]):
                print("\033[32mValidation for active member values check is passed\033[0m")
            else:
                activemembervaluecheck = True
                activememberfilevalue = {
                    'activemembervaluecheck' : activemembervaluecheck
                }
                print("\033[31mValidation for active member check is failed. Other values than 0 and 1\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',activememberfilevalue)
            
            if set(df['Customer feedback Ratings'].unique()).issubset([1,2,3,4,5]):
                print("\033[32mValidation for Customer feedback Ratings values check is passed\033[0m")
            else:
                ratingsvaluecheck = True
                ratingfilevalue = {
                    'ratingsvaluecheck' : ratingsvaluecheck
                }
                print("\033[31mValidation for Customer feedback Ratings check is failed. Other values than 0 and 1\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',ratingfilevalue)
            
            if set(df['churn'].unique()).issubset([0,1]):
                print("\033[32mValidation for churn values check is passed\033[0m")
            else:
                churnvaluecheck = True
                churnfilevalue = {
                    'churnvaluecheck' : churnvaluecheck
                }
                print("\033[31mValidation for churn value check is failed. Other values than 0 and 1\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',churnfilevalue)
            
            if df.isnull().any().any():
                 nullstatus = True
                 nullfilestatus = {
                     'nullstatus': nullstatus
                 }
                 print("\033[31mValidation for null values check is failed\033[0m")
                 os.remove("./Saved_Dataset/" + uploaded_file.name)
                 return render(request,'index.html',nullfilestatus)
            else:
                 print("\033[32mValidation for null values check is passed\033[0m")

            if df.duplicated().any():
                duplicatestatus = True
                duplicatefilestatus = {
                    'duplicatestatus': duplicatestatus
                }
                print("\033[31mValidation for duplicate values check is failed\033[0m")
                os.remove("./Saved_Dataset/" + uploaded_file.name)
                return render(request,'index.html',duplicatefilestatus)
            else:
                 print("\033[32mValidation for duplicate values check is passed\033[0m") 

            df.drop(['customer_id'], inplace =True, axis = 1)
            df['country'] = df['country'].replace(['Germany'],'0')
            df['country'] = df['country'].replace(['France'],'1')
            df['country'] = df['country'].replace(['Spain'],'2')
            X = df.drop('churn', axis=1)
            y = df['churn']
        return  render(request,'upload.html',filename)
    except Exception:
        datexcpt = "Upload the Dataset to see the results."
        exceptstatus = True
        exception = {
                'exception': datexcpt,
                'exceptstatus': exceptstatus
            }
        return  render(request,'index.html',exception)

def model_pick(request):
    if decisionTree_accuracy > svm_accuracy and decisionTree_accuracy > lda_accuracy :
        final_model = model_accuracy
    elif svm_accuracy > lda_accuracy :
        final_model = svm_accuracy
    else :
        final_model = lda_accuracy
    return final_model

def training(request):
    global ldaButton
    global DTbutton
    global svmButton
    global DTdescription
    global svmdescription
    global ldadescription
 
    if 'decisionTree' in request.POST:
        X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=20, test_size=0.1)
        from sklearn.tree import DecisionTreeClassifier
        global model
        global DTmodelname 
        DTmodelname = 'Decision Tree'
        model = DecisionTreeClassifier()
        model.fit(X_train, y_train)
        model.feature_names = list(X_train.columns.values)
        y_pred = model.predict(X_test)
        global decisionTree_accuracy
        global final_model
        decisionTree_accuracy = accuracy_score(y_test, y_pred)*100 
        DTbutton = False
        DTdescription = True
        if ldaButton != False:
            ldaButton =  True
        if svmButton != False:
            svmButton = True
        accfile = {
            'accfilename': decisionTree_accuracy,
            'filenametext': filenametextdisp,
            'dTbutton': DTbutton,
            'svmButton': svmButton,
            'ldaButton': ldaButton,
            'DTdescription':DTdescription,
            'modelname': DTmodelname
        }
        global model_accuracy
        model_accuracy =  accuracy_score(y_test, y_pred)*100
        return render(request,'upload.html',accfile)

    if 'svm' in request.POST:
        global svm_accuracy
        X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=20, test_size=0.1)
        from sklearn import svm
        global svmmodelname 
        svmmodelname = 'Support Vectors Machines'
        svm = svm.SVC()
        svm.fit(X_train, y_train)
        y_pred = svm.predict(X_test)
        svm_accuracy =  accuracy_score(y_test, y_pred)*100
        svmButton = False
        svmdescription = True
        if ldaButton != False:
            ldaButton =  True
        if DTbutton != False:
            DTbutton = True
        accfile = {
            'accfilename': svm_accuracy,
            'filenametext': filenametextdisp,
            'svmButton': svmButton,
            'ldaButton': ldaButton,
            'dTbutton': DTbutton,
            'svmdescription':svmdescription,
            'modelname': svmmodelname
        }  
        return render(request,'upload.html',accfile)
    
    if 'LDA' in request.POST:
        global lda_accuracy
        X_train, X_test, y_train, y_test = train_test_split(X,y, random_state=20, test_size=0.2)
        from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
        ldamodel = LinearDiscriminantAnalysis()
        global ldamodelname 
        ldamodelname = 'Linear Discriminant Analysis'
        ldamodel.fit(X_train, y_train)
        y_pred = ldamodel.predict(X_test)
        lda_accuracy =  accuracy_score(y_test, y_pred)*100
        ldaButton = False
        ldadescription = True
        if svmButton != False:
            svmButton =  True
        if DTbutton != False:
            DTbutton = True
        accfile = {
            'accfilename': lda_accuracy,
            'filenametext': filenametextdisp,
            'ldaButton': ldaButton,
            'svmButton': svmButton,
            'dTbutton': DTbutton,
            'ldadescription': ldadescription,
            'modelname': ldamodelname
        }  
        return render(request,'upload.html',accfile)
    
def picklemodel(request):
    global hostmodelstatus
    hostmodelstatus = False
    try:
        if svmButton == False and DTbutton == False and ldaButton == False:
            final_model = model
        if decisionTree_accuracy > svm_accuracy and decisionTree_accuracy > lda_accuracy:
            finalmodelname = 'Decision Tree'
            modelname = DTmodelname
        elif svm_accuracy > decisionTree_accuracy and svm_accuracy > lda_accuracy:
            finalmodelname = 'Support Vectors Machines'
            modelname = svmmodelname
        else:
            finalmodelname = 'Linear Discriminant Analysis'
            modelname = ldamodelname
        if (final_model):
            directory_path = "./Final_Model_pickle"
            files = os.listdir(directory_path)
            if files:
                for file in files:
                    file_path = os.path.join(directory_path,file)
                    try:
                        if os.path.isfile(file_path):
                            os.unlink(file_path)
                    except Exception as e:
                        print("Error deleting file: {file_path} - {e}")
            filenamefinal = filenametextdisp.replace('.csv','')
            pickle.dump(model, open('./Final_Model_pickle/Final_Pickled_model.pkl', 'wb'))
            pickle_status = True
            picklestatus = {
                'pickle_status': pickle_status,
                'filenametext': filenametextdisp,
                'filenamefinal': filenamefinal,
                'ldaButton': ldaButton,
                'svmButton': svmButton,
                'dTbutton': DTbutton,
                'dTaccuracy': decisionTree_accuracy,
                'svm_accuracy':svm_accuracy,
                'lda_accuracy':lda_accuracy,
                'accfilename': svm_accuracy,
                'finalmodelname': finalmodelname,
                'modelname': modelname
            }
            return render(request,'upload.html', picklestatus)
    except NameError:
        pickle_status = False
        picklestatus = {
            'pickle_status': pickle_status,
            'filenametext': filenametextdisp,
            'ldaButton': ldaButton,
            'svmButton': svmButton,
            'dTbutton': DTbutton
        }
        return render(request,'upload.html',picklestatus)

def loginmethod(request):
    if request.method == "POST":
        loginsuccess = authenticate(request,username = request.POST.get('username'),password = request.POST.get('password'))
        if loginsuccess is None:
            return render(request,'login.html',{'success':False,'err':"Username and Password is not correct"})
        else:
            login(request,loginsuccess)
            return render(request,'index.html')
    else:
        return render(request,'login.html',{'success':False,'err':"Username and Password is not correct"})
    
def logoutmethod(request):
    logout(request)
    return render(request,'login.html')

def enablehostmodel(request):
    global hostmodelstatus
    hostmodelstatus = True
    if hostmodelstatus == True:
        return hostmodel(request)

def hostmodel(request):
    global hostmodelstatus
    if hostmodelstatus == False:
        raise Http404('Path not found')
    else:
        if request.method == 'POST':
            data =  json.loads(request.body)
            dataF=pd.DataFrame({'x':data}).transpose()
            model = joblib.load("./Final_Model_pickle/Final_Pickled_model.pkl", "rb")
            cols_when_model_builds = model.feature_names
            dataF = dataF.reindex(columns=cols_when_model_builds)
            prediction = model.predict(dataF)
            prediction = json.dumps(int(prediction[0]))
            probability =  model.predict_proba(dataF)[:,1]
            probability = json.dumps(float(probability[0]))
            dataResponse = {
                'prediction': prediction,
                'probability': probability
            }
            return JsonResponse(dataResponse)
        else:
            hostmodelstatus = True
            filedetails = {
                'filename': 'Final_Pickled_model.pkl'
            }
            return render(request, 'hostmodel.html',filedetails)

def getmodel(request):
    if request.method == 'GET':
        path = './Final_Model_pickle/Final_Pickled_model.pkl'
        if os.path.isfile(path):
            data = {'message': 'File exists'}
        else:
            data = {'message': 'File does not exist'}
        return JsonResponse(data)